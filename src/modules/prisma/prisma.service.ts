/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 17:31:55
 * @LastEditTime: 2023-04-12 17:33:22
 * @LastEditors:
 * @FilePath: \nest-service\src\modules\prisma\prisma.service.ts
 */
import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
