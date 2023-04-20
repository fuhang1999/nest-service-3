/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-04-19 21:18:15
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.service.ts
 */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './constants';
import { RedisService } from '@/common/db/redis/redis.service';
import { secretDecrypt, secretEncrypt } from '@/common/utils/aes-secret';
import { getRandomString } from '@/common/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(username: any, pass: string): Promise<any> {
    const user: any = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new BadRequestException(`用户${username}未注册~`);
    }
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 创建token
  createToken(user: any, type = 'token') {
    const tokenType =
      type === 'token'
        ? {
            secret: jwtConstants.secret,
            expiresIn: '4h',
          }
        : { secret: jwtConstants.secret, expiresIn: '7d' };
    return this.jwtService.sign(user, tokenType);
  }

  async login(user: any) {
    const accessToken = this.createToken(user);
    const refreshToken = this.createToken(user, 'refresh');
    const accessStr = getRandomString(10);
    const refreshStr = getRandomString(10);

    const nanoidAccessToken = secretEncrypt(accessStr + user.id);

    const nanoidRefreshToken = secretEncrypt(refreshStr + user.id);
    //存储token到redis
    await this.redisService.initRedis('auth.login', 0);
    await this.redisService.setRedis(
      'auth.login',
      0,
      `access_token::${user.id}`,
      `${accessStr}${accessToken}`,
      60 * 60 * 4,
    );
    await this.redisService.setRedis(
      'auth.login',
      1,
      `refresh_token::${user.id}`,
      `${refreshStr}${refreshToken}`,
      60 * 60 * 4,
    );
    return {
      access_token: nanoidAccessToken,
      refresh_token: nanoidRefreshToken,
      expires_in: 60 * 60 * 4,
    };
  }

  // 刷新token
  async refreshToken(user: any, option: any) {
    const token = option.refresh_token;
    const prefix = secretDecrypt(token)?.substr(0, 10);
    const key = secretDecrypt(token)?.substr(10);
    const redis_token: any = await this.redisService.getRedis(
      'jwt-auth.guard.canActivate',
      1,
      `refresh_token::${key}`,
    );

    const decodePrefix = redis_token?.substr(0, 10);
    const decodeToken = redis_token?.substr(10);
    const payload: any = this.jwtService.decode(decodeToken);
    if (!decodePrefix || !prefix || decodePrefix !== prefix || !payload) {
      throw new UnauthorizedException('无效的token');
    }
    const { iat, exp, ...userData } = payload;
    const refreshToken = await this.login(userData);

    return refreshToken;
  }
}
