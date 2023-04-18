/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-14 22:50:32
 * @LastEditTime: 2023-04-18 08:26:25
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\db\redis\redis.service.ts
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

const redisList = []; // 用于存储 redis 实例
const redisIndex = []; // 用于记录 redis 实例索引

@Injectable()
export class RedisService {
  constructor(private readonly configService: ConfigService) {}

  async initRedis(method: string, db = 0) {
    const redisOption = {
      host: this.configService.get('REDIS_HOST'),
      port: Number(this.configService.get('REDIS_PORT')),
      //   password: this.configService.get('REDIS_PASSWORD'),
    };

    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      // Logger.debug(`[Redis ${db}]来自 ${method} 方法调用 `);
      redisList[db] = new Redis(Object.assign(redisOption, { db }));
      // redisList[db] = new Redis({ ...redisOption, db });
      redisIndex.push(db);
    } else {
      // Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }

  async setRedis(
    method: string,
    db = 0,
    key: string,
    val: string,
    timeout = 60 * 60,
  ) {
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    const redis = await this.initRedis(method, db);
    redis.set(`${key}`, val);
    redis.expire(`${key}`, timeout);
  }

  async getRedis(method: string, db = 0, key: string) {
    return new Promise(async (resolve, reject) => {
      const redis = await this.initRedis(method, db);
      redis.get(`${key}`, (err: any, val: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }
}
