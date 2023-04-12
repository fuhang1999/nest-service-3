/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 20:07:17
 * @LastEditTime: 2023-04-12 23:08:25
 * @LastEditors:
 * @FilePath: \nest-service\src\modules\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
