/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-04-18 08:28:43
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.service.ts
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './constants';
import { RedisService } from '@/common/db/redis/redis.service';
import { secretEncrypt } from '@/common/utils/aes-secret';
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

  async login(user: any) {
    console.log('user', user);

    const payload = user;
    // const payload = { username: user.username, id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '4h',
    });
    const refreshToken = this.jwtService.sign(
      { type: 'refresh', id: payload.id },
      { secret: jwtConstants.secret, expiresIn: '7d' },
    );
    const accessStr = getRandomString(10);
    const refreshStr = getRandomString(10);

    const nanoidAccessToken = secretEncrypt(accessStr + payload.id);

    const nanoidRefreshToken = secretEncrypt(refreshStr + payload.id);
    //存储token到redis
    await this.redisService.initRedis('auth.login', 0);
    await this.redisService.setRedis(
      'auth.login',
      0,
      `access_token::${payload.id}`,
      `${accessStr}${accessToken}`,
      60 * 60 * 4,
    );
    await this.redisService.setRedis(
      'auth.login',
      1,
      `refresh_token::${payload.id}`,
      `${refreshStr}${refreshToken}`,
      60 * 60 * 4,
    );
    return {
      access_token: nanoidAccessToken,
      refresh_token: nanoidRefreshToken,
      expires_in: 60 * 60 * 4,
    };
  }
}
