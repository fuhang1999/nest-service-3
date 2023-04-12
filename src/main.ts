/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 00:23:41
 * @LastEditTime: 2023-04-12 17:38:30
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  // 设置swagger文档相关配置
  const config = new DocumentBuilder()
    .setTitle('Naive Admin 后台管理系统接口文档')
    .setDescription('后台管理系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
