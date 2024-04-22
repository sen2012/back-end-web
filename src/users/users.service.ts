import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UpdateUser } from "src/auth/dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async updateUser(id: number, data: UpdateUser) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        province: data.province,
      },
    });
  }
}
