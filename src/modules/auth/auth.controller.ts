/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 19:11:11
 * @LastEditTime: 2023-04-14 19:19:27
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  // 1.先进行登录验证，执行local.strategy.ts文件中的calidate方法
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // 4.验证通过以后执行这个函数
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
