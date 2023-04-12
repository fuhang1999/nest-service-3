/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 01:18:43
 * @LastEditTime: 2023-04-13 01:19:56
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\utils\utils.ts
 */
import { Request } from 'express';

export const getReqMainInfo: (req: Request) => {
  [prop: string]: any;
} = (req) => {
  const { headers, url, method, body } = req;

  // 获取 IP
  const xRealIp = headers['X-Real-IP'];
  const xForwardedFor = headers['X-Forwarded-For'];
  const { ip: cIp } = req;
  //   const { remoteAddress } = connection || {};
  const ip = xRealIp || xForwardedFor || cIp;

  const logInfo = {
    title: '测试',
    url,
    ip,
    userAgent: headers['user-agent'],
    responseData: JSON.stringify(body),
    type: 1,
    method,
    host: headers.host,
  };

  return logInfo;
};
