/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-31 01:11:57
 * @LastEditTime: 2023-04-18 15:34:14
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\guards\jwt-auth.guard.ts
 */
import { RedisService } from '@/common/db/redis/redis.service';
import { secretDecrypt } from '@/common/utils/aes-secret';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_GUEST } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(
  //   private reflector: Reflector,
  //   private readonly jwtService: JwtService,
  //   private readonly redisService: RedisService,
  // ) {
  //   super();
  // }
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // token对比
    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || void 0;
    let tokenNotTimeOut = true;
    if (authorization) {
      const token = authorization.split(' ')[1]; // authorization: Bearer xxx
      try {
        const prefix = secretDecrypt(token)?.substr(0, 10);
        const key = secretDecrypt(token)?.substr(10);
        const redis_token: any = await this.redisService.getRedis(
          'jwt-auth.guard.canActivate',
          0,
          `access_token::${key}`,
        );
        const decodePrefix = redis_token?.substr(0, 10);
        const decodeToken = redis_token?.substr(10);
        request['headers'].authorization = `Bearer ${decodeToken}`;
        const payload: any = this.jwtService.decode(decodeToken);
        if (!decodePrefix || !prefix || decodePrefix !== prefix || !payload) {
          throw new UnauthorizedException('您的登录信息已过期，请重新登录');
        }
      } catch (err) {
        tokenNotTimeOut = false;
        throw new UnauthorizedException(err.message || '请重新登录');
      }
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
  }

  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }

  handleRequest<User>(err: any, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
