import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async user(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    // return this.prisma.$queryRaw`select * from User where 'id' = ${id}`;
  }
}
