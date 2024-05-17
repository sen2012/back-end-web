import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { ChangePasswordDto, UpdateRoleDto, UpdateUserDto } from 'src/auth/dto'
import { PrismaService } from 'src/prisma.service'
import * as argon from 'argon2'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  //User update they own account
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    })
    return this.prismaService.user.update({
      where: { id: userId },
      data: updateUserDto,
    })
  }

  //delete user admin
  async deleteUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return this.prismaService.user.delete({ where: { id } })
  }

  //All user list
  async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany()
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    })

    const isOldPasswordValid = await argon.verify(
      user.password,
      changePasswordDto.oldPassword,
    )

    if (!isOldPasswordValid) {
      throw new NotFoundException('Old password is incorrect')
    }

    const hashedNewPassword = await argon.hash(changePasswordDto.newPassword)
    if (
      changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword
    ) {
      throw new NotFoundException(
        'New password and confirm password do not match',
      )
    }

    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    })
    return 'Password changed successfully'
  }

  async searchName(name: string) {
    return this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  async getUserId(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async updateRole(id: number, updateRole: UpdateRoleDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return this.prismaService.user.update({
      where: { id },
      data: {
        role_id: updateRole.role_id,
      },
    })
  }
}
