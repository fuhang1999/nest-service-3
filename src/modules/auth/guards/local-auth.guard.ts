/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-13 16:48:21
 * @LastEditTime: 2023-04-14 19:23:09
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\guards\local-auth.guard.ts
 */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('走这里没有');
    return super.canActivate(context) as boolean;
  }
  getRequest(context: ExecutionContext) {
    console.log('走这里没有1');
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }
  handleRequest<User>(err, user: User): User {
    console.log('走这里没有2');

    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
