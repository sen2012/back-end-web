import { Module } from '@nestjs/common'
import { OrderdetailController } from '../orderdetail/orderdetail.controller'
import { OrderdetailService } from '../orderdetail/orderdetail.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [OrderdetailController],
  providers: [OrderdetailService, PrismaService],
  exports: [OrderdetailService, PrismaService],
})
export class OrderdetailModule {}
