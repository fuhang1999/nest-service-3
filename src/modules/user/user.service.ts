/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 20:07:17
 * @LastEditTime: 2023-04-13 18:53:19
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.service.ts
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: any): Promise<UserEntity> {
    const existUser = await this.findOneByUsername(data?.username);
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.user.create({
      data,
    });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findOne(id: string | null): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
