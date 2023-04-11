/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 00:23:41
 * @LastEditTime: 2023-04-12 00:27:13
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.listen(3000);
}
bootstrap();
