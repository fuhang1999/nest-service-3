/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 01:18:43
 * @LastEditTime: 2023-04-14 18:54:14
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\utils\utils.ts
 */
import { Request, Response } from 'express';

export const getReqMainInfo: (
  req: Request,
  message?: string,
) => {
  [prop: string]: any;
} = (req, message) => {
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
    requestData: JSON.stringify(body),
    responseMessage: message,
    method,
    host: headers.host,
  };

  return logInfo;
};
