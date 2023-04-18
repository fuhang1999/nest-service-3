/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 20:07:17
 * @LastEditTime: 2023-04-15 00:51:32
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/common/db/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtService, RedisService, ConfigService],
})
export class UserModule {}
