/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 01:18:43
 * @LastEditTime: 2023-04-18 08:35:13
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\utils\utils.ts
 */
import { Request } from 'express';

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

export const getRandomString = (len: number) => {
  const randomCharacter = 'qwertyuiopasdfghjklzxcvbnm1234567890';
  const min = 0;
  const max = randomCharacter.length - 1;
  let _str = ''; //定义随机字符串 变量
  //判断是否指定长度，否则默认长度为15
  len = len || 15;
  //循环生成字符串
  for (let i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc);
    })(function (min, max, i, _self) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min);
      const numStart = randomCharacter.length - 10;
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self);
      }
      return indexTemp;
    }, i);
    _str += randomCharacter[index];
  }
  return _str;
};
