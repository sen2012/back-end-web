import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService){}

    @Get()
    async getRole(): Promise<Role[]> {
    return await this.roleService.getRole();
  }
}
