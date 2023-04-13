/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-04-13 18:05:48
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.service.ts
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
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
    const payload = { username: user.username, id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '4h',
    });
    const refreshToken = this.jwtService.sign(
      { type: 'refresh', id: payload.id },
      { secret: jwtConstants.secret, expiresIn: '7d' },
    );
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
