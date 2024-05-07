import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
    constructor( private prismaService: PrismaService){}

    async getRole(): Promise<Role[]> {
        return await this.prismaService.role.findMany();
    }
}
