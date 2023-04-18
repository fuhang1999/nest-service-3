/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-13 16:48:21
 * @LastEditTime: 2023-04-14 22:56:53
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\guards\local-auth.guard.ts
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
