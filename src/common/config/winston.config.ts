/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-04 01:02:15
 * @LastEditTime: 2023-04-14 19:11:41
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
      all: true,
    }),
    winston.format.ms(),
    winston.format.splat(),
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    winston.format.printf((info) => {
      if (info.stack) {
        info.message = info.stack;
      }
      const colorIndex =
        info.level === 'DEBUG'
          ? '5'
          : info.level === 'INFO'
          ? '2'
          : info.level === 'ERROR'
          ? '1'
          : '0';
      // console.log(info);

      return `\x1B[3${colorIndex}m[Winston] ${info.pid}  -\x1B[39m ${
        info.timestamp
      }     \x1B[3${colorIndex}m${info.level}${
        info.level?.length < 7 ? ' '.repeat(7 - info.level?.length) : ''
      }\x1B[39m \x1B[33m[${
        info.name || 'NestApplication'
      }]\x1B[39m \x1B[3${colorIndex}m${info.responseMessage} {${info.url}, ${
        info.method
      }}\x1B[39m \x1B[33m${info.ms}\x1B[39m`;
    }),
    // nestWinstonModuleUtilities.format.nestLike('CustomLogger', {
    //   colors: true,
    //   prettyPrint: true,
    // }),
  ),
  defaultMeta: { pid: process.pid },
  transports: [
    new winston.transports.Console(),
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
    // 中间件 middleware 记录
    new winston.transports.DailyRotateFile({
      level: 'debug',
      dirname: `logs/debug`, // 日志保存的目录
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
    // HTTP 请求记录
    new winston.transports.DailyRotateFile({
      level: 'info',
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
