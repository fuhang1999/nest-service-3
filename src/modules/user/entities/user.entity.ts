/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-12 20:07:17
 * @LastEditTime: 2023-04-12 23:20:24
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\entities\user.entity.ts
 */
import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  realName: string | null;

  @ApiProperty()
  nickname: string | null;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  status: number;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  roleId: string;

  @ApiProperty()
  departmentId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
