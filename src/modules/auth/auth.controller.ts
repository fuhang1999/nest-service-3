/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-04-19 01:27:08
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.controller.ts
 */
import {
  Controller,
  Post,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('token')
  async token(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: '刷新token' })
  @UseGuards(JwtAuthGuard)
  @Post('refreshToken')
  async refreshToken(@Req() req: any, @Body() body: any) {
    return this.authService.refreshToken(req.user, body);
  }
}
