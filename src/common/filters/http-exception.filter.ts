/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-26 23:04:51
 * @LastEditTime: 2023-04-18 08:26:36
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\filters\http-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { getReqMainInfo } from '../utils/utils';
import { LoggingService } from '@/modules/logging/logging.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 注入日志服务相关依赖
  constructor(
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    // const errorResponse = {
    //   data: null,
    //   message: status == 401 ? 'token过期，请重新登录' : message,
    //   code: status == 401 ? 401 : -1,
    //   success: false,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // };

    // 设置返回的状态码， 请求头，发送错误信息
    // response.status(status);
    // response.header('Content-Type', 'application/json; charset=utf-8');
    // response.send(errorResponse);
    // console.log('response-response', message);

    this.loggingService.error(
      'HttpExceptionFilter',
      getReqMainInfo(request, message),
    );

    response.status(status).send({
      code: status,
      data: null,
      success: false,
      message: message,
    });

    // const ctx = host.switchToHttp();
    // const res = ctx.getResponse<Response>();
    // const req = ctx.getRequest<Request>();
    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

    // const response: any = exception.getResponse();
    // const { error, message } = response;

    // let msg =
    //   exception.message || (status >= 500 ? 'Service Error' : 'Client Error');
    // if (
    //   Object.prototype.toString.call(response) === '[object Object]' &&
    //   response.message
    // ) {
    //   msg = response.message;
    // }

    // // 记录日志（错误消息，错误码，请求信息等）
    // this.logger.error(msg, {
    //   status,
    //   req: getReqMainInfo(req),
    // stack: exception.stack,
    // });

    // res.status(status).json({
    //   status,
    //   success: false,
    //   timestamp: new Date().toISOString(),
    //   path: req.url,
    //   error,
    //   message: msg || message || exception.getResponse(),
    // });
  }
}
