/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-27 22:28:02
 * @LastEditTime: 2023-04-14 19:11:13
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\interceptors\response.interceptor.ts
 */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { getReqMainInfo } from '../utils/utils';
import { Request, Response } from 'express';
import { LoggingService } from '@/modules/logging/logging.service';

interface Data<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly loggingService: LoggingService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        this.loggingService.info(
          'ResponseInterceptor',
          getReqMainInfo(request, '请求成功'),
        );
        return {
          data,
          status: 200,
          message: '请求成功',
          success: true,
        };
      }),
    );
  }
}
