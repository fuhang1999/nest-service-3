/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 20:07:17
 * @LastEditTime: 2023-04-18 11:53:56
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@ApiBearerAuth()
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(userData);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '登录用户详细信息',
    description: '登录用户详细信息',
  })
  async getDoctorList(@Req() req) {
    return req.user;
  }
}
