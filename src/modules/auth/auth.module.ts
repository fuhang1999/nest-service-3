/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-04-18 01:01:46
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.module.ts
 */
/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-03-31 01:59:29
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.module.ts
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisService } from '@/common/db/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    ConfigService,
    RedisService,
  ],
})
export class AuthModule {}
