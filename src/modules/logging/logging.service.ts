/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 09:42:27
 * @LastEditTime: 2023-04-13 01:26:11
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\logging\logging.service.ts
 */
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger, LoggerOptions } from 'winston';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { UpdateLoggingDto } from './dto/update-logging.dto';
import { Logging } from './entities/logging.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prisma: PrismaService,
  ) {}

  async create(data: any): Promise<Logging> {
    return this.prisma.log.create(data);
  }

  async log(name: string, message: any): Promise<Logging> {
    this.logger.info(name, message.req);
    return this.prisma.log.create({
      data: Object.assign(message.req, {
        type: 1,
      }),
    });
  }

  async error(name: string, message: any): Promise<Logging> {
    this.logger.error(name, message.req);
    return this.prisma.log.create({
      data: Object.assign(message.req, {
        type: 2,
      }),
    });
  }

  warn(name: string, message: any) {
    this.logger.warn(name, message);
  }

  debug(name: string, message: any) {
    this.logger.debug(name, message);
  }

  verbose(name: string, message: any) {
    this.logger.verbose(name, message);
  }
}
