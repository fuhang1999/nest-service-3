/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-27 22:28:02
 * @LastEditTime: 2023-03-30 17:44:33
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
import { Request } from 'express';
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

    const req = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        this.loggingService.log('response', {
          responseData: data,
          req: getReqMainInfo(req),
        });
        // this.logger.info('response', {
        //   responseData: data,
        //   req: getReqMainInfo(req),
        // });
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
