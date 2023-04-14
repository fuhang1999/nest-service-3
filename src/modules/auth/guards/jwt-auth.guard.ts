/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-31 01:11:57
 * @LastEditTime: 2023-04-14 19:17:48
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\guards\jwt-auth.guard.ts
 */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('走这里没有');

    const isPublic = this.reflector.getAllAndOverride<boolean>('guest', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // token对比
    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || void 0;
    console.log('authorization', authorization);

    let tokenNotTimeOut = true;
    if (authorization) {
      const token = authorization.split(' ')[1]; // authorization: Bearer xxx
      try {
        const payload: any = this.jwtService.decode(token);
        console.log('payload', payload);
        // const key = `${payload.id}`;
        // const redis_token = await RedisInstance.getRedis(
        //   'jwt-auth.guard.canActivate',
        //   0,
        //   key,
        // );
        // if (!redis_token || redis_token !== token) {
        //   throw new UnauthorizedException('您的登录信息已过期，请重新登录');
        // }
      } catch (err) {
        tokenNotTimeOut = false;
        throw new UnauthorizedException(err.message || '请重新登录');
      }
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
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
