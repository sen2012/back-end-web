import { Injectable, NotFoundException } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async getRoleId(id: number): Promise<Role> {
    const role = await this.prismaService.role.findUnique({
      where: { id },
    })
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`)
    }
    return role
  }
}
