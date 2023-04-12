/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-04 01:02:15
 * @LastEditTime: 2023-04-04 01:09:59
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\config\winston.config.ts
 */
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const WinstonConfig = {
  format: winston.format.combine(
    winston.format.colorize({
      colors: {
        info: 'blue',
        warn: 'yellow',
        debug: 'blue',
      },
    }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      if (info.stack) {
        info.message = info.stack;
      }
      return `${info.timestamp} [${info.pid}] ${info.level}: [${
        info.context || 'Application'
      }] ${info.message}`;
    }),
  ),
  defaultMeta: { pid: process.pid },
  transports: [
    new winston.transports.Console(),
    // {
    //     level: 'info',
    //     format: winston.format.combine(
    //       winston.format.json(),
    //       winston.format.ms(),
    //       winston.format.timestamp({
    //         format: 'YYYY/MM/DD HH:mm:ss',
    //       }),
    //       nestWinstonModuleUtilities.format.nestLike('CustomLogger', {
    //         colors: true,
    //         prettyPrint: true,
    //       }),
    //     ),
    //   }
    new winston.transports.DailyRotateFile({
      level: 'error',
      dirname: `logs/error`, // 日志保存的目录
      filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
      datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
      maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
      // 记录时添加时间戳信息
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      dirname: `logs/info`, // 日志保存的目录
      filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
      datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
      maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
      // 记录时添加时间戳信息
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
    }),
  ],
};
