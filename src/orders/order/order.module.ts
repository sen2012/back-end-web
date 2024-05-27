import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  exports: [OrderService, PrismaService],
})
export class OrderModule {}
