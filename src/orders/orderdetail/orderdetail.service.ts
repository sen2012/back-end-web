import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto, DeleteDto, UpdateOrderDetailDto } from 'src/auth/dto/orderdetail.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderdetailService {
    constructor(private prismaService: PrismaService){

    }

    async addToCart(userId: number, create: CreateOrderDetailDto){
      const incompleteOrder = await this.prismaService.order.findFirst({
          where: {
            user_id: userId,
            status: false,
          },
      });

      const addNew = await this.prismaService.orderDetail.create({
        data: {
          order_id: incompleteOrder.id,
          price: create.price,
          quantity: create.quantity,
          product_id: create.productId
        }
      })
      
      return addNew
    }

    async getOrder(userId: number){
      return this.prismaService.orderDetail.findMany({
        where: {
          order: {
            user_id: userId,
            status: false
          }
        }
      })
    }
    
    async updateCart( updateOrderDetailDto : UpdateOrderDetailDto){
      return this.prismaService.orderDetail.update({
        where: {
          id: updateOrderDetailDto.id
        },
        data: {
          quantity: updateOrderDetailDto.quantity,
        },
      });
    }

  async deleteOrderDetail(id: number){
    const OrderDetail = await this.prismaService.orderDetail.findUnique({
      where: { id },
    });
    if (!OrderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return this.prismaService.orderDetail.delete({ where: { id } });
  }
}
