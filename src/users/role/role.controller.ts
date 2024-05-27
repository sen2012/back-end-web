import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { RoleService } from './role.service'
import { Role } from '@prisma/client'

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get(':id')
  async getRoleId(@Param('id') id: string): Promise<Role> {
    const role = await this.roleService.getRoleId(parseInt(id, 10))
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`)
    }
    return role
  }
}
