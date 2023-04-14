/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-14 10:14:53
 * @LastEditTime: 2023-04-14 18:43:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\middleware\winston\winston.middleware.ts
 */
import { getReqMainInfo } from '@/common/utils/utils';
import { LoggingService } from '@/modules/logging/logging.service';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class WinstonMiddleware implements NestMiddleware {
  // 注入日志服务相关依赖
  constructor(private readonly loggingService: LoggingService) {}

  use(request: Request, response: Response, next: () => void) {
    next();
    this.loggingService.debug('WinstonMiddleware', getReqMainInfo(request));
  }
}
