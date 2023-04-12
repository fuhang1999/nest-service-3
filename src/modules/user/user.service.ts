/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 20:07:17
 * @LastEditTime: 2023-04-13 01:29:14
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.service.ts
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: any): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
    });
  }

  async user(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOne(username: string | null): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
