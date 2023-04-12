/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 17:31:45
 * @LastEditTime: 2023-04-12 17:33:46
 * @LastEditors:
 * @FilePath: \nest-service\src\modules\prisma\prisma.module.ts
 */
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
