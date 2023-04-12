/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 16:45:13
 * @LastEditTime: 2023-03-30 17:48:18
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\filters\any-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Response } from 'express';
import { getReqMainInfo } from '../utils/utils';
import { LoggingService } from '@/modules/logging/logging.service';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // this.logger.error('exception', {
    //   status,
    //   req: getReqMainInfo(request),
    // });
    this.loggingService.error('exception', {
      responseData: response,
      req: getReqMainInfo(request),
    });
    response.status(status).send({
      code: status,
      data: null,
      success: false,
      message: `Service Error: ${exception}`,
    });
  }
}
