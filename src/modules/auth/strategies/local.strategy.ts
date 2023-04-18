/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-13 16:48:21
 * @LastEditTime: 2023-04-18 16:04:43
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\strategies\local.strategy.ts
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }
}
