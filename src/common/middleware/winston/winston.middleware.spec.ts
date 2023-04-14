/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-14 10:14:53
 * @LastEditTime: 2023-04-14 10:20:58
 * @LastEditors:
 * @FilePath: \nest-service\src\common\middleware\winston\winston.middleware.spec.ts
 */
import { WinstonMiddleware } from './winston.middleware';

describe('WinstonMiddleware', () => {
  it('should be defined', () => {
    expect(new WinstonMiddleware()).toBeDefined();
  });
});
