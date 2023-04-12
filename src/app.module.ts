/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-11 21:52:01
 * @LastEditTime: 2023-04-13 01:28:04
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { DepartmentModule } from './modules/department/department.module';
import { LoggingService } from './modules/logging/logging.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    PrismaModule,
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [
    LoggingService,
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 应用全局过滤器
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
