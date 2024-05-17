import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateOrderDetailDto,
  DeleteDto,
  UpdateOrderDetailDto,
} from 'src/auth/dto/orderdetail.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class OrderdetailService {
  constructor(private prismaService: PrismaService) {}

  async addToCart(userId: number, create: CreateOrderDetailDto) {
    const incompleteOrder = await this.prismaService.order.findFirst({
      where: {
        user_id: userId,
        status: 'incomplete',
      },
    })

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingOrderDetail = await this.prismaService.orderDetail.findFirst({
      where: {
        order_id: incompleteOrder.id,
        product_id: create.productId,
      },
    })

    if (existingOrderDetail) {
      // Nếu sản phẩm đã tồn tại, tăng quantity lên 1 và cập nhật lại
      const updatedOrderDetail = await this.prismaService.orderDetail.update({
        where: {
          id: existingOrderDetail.id,
        },
        data: {
          quantity: existingOrderDetail.quantity + 1,
        },
      })

      await this.calculate(incompleteOrder.id)

      return updatedOrderDetail
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      const addNew = await this.prismaService.orderDetail.create({
        data: {
          order_id: incompleteOrder.id,
          price: create.price,
          quantity: create.quantity,
          product_id: create.productId,
        },
      })

      await this.calculate(incompleteOrder.id)

      return addNew
    }
  }

  async calculate(orderId: number) {
    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
        order_id: orderId,
      },
    })

    let total = 0
    orderDetails.forEach((detail) => {
      total += detail.quantity * detail.price
    })

    await this.prismaService.order.update({
      where: { id: orderId },
      data: { total },
    })
  }

  async updateCart(userId: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const incompleteOrder = await this.prismaService.order.findFirst({
      where: {
        user_id: userId,
        status: 'incomplete',
      },
    })

    const updateCartDetail = await this.prismaService.orderDetail.update({
      where: {
        id: updateOrderDetailDto.id,
      },
      data: {
        quantity: updateOrderDetailDto.quantity,
      },
    })

    if (updateOrderDetailDto.quantity === 0) {
      await this.prismaService.orderDetail.delete({
        where: {
          id: updateOrderDetailDto.id,
        },
      })
    }

    await this.calculate(incompleteOrder.id)

    return updateCartDetail
  }

  async getOrderDetail(userId: number) {
    return this.prismaService.orderDetail.findMany({
      where: {
        order: {
          user_id: userId,
          status: 'incomplete',
        },
      },
    })
  }

  async deleteOrderDetail(userId: number, detailId: number) {
    const incompleteOrder = await this.prismaService.order.findFirst({
      where: {
        user_id: userId,
        status: 'incomplete',
      },
    })

    const deleted = await this.prismaService.orderDetail.delete({
      where: {
        id: detailId,
      },
    })
    await this.calculate(incompleteOrder.id)
    return deleted
  }
}
