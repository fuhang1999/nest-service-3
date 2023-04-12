/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-11 21:52:01
 * @LastEditTime: 2023-04-11 21:54:39
 * @LastEditors:
 * @FilePath: \nest-service\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
