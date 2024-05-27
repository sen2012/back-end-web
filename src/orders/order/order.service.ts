import { Injectable } from '@nestjs/common'
import { OrderDetail } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async addOrder(userId: number) {
    const incompleteOrder = await this.prismaService.order.findFirst({
      where: {
        user_id: userId,
        status: 'incomplete', // Giả sử trạng thái chưa hoàn thành được đánh dấu là "incomplete"
      },
    })
    if (!incompleteOrder) {
      await this.add(userId)
    }
  }

  async add(userId: number) {
    const currentUTCTime = Date.now()
    const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000
    const newOrder = await this.prismaService.order.create({
      data: {
        user_id: userId,
        create_at: new Date(utcPlus7Time),
        status: 'incomplete',
      },
    })
  }

  async getOrder() {
    return this.prismaService.order.findMany({
      where: {
        status: 'wait to confirm',
      },
    })
  }

  async confirmOrder(orderId: number) {
    const currentUTCTime = Date.now()
    const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000
    try {
      // Tìm đơn hàng thỏa mãn điều kiện
      const order = await this.prismaService.order.findFirst({
        where: {
          id: orderId,
          status: 'wait to confirm',
        },
      })

      // Nếu không tìm thấy đơn hàng, ném ra một ngoại lệ
      if (!order) {
        throw new Error('Không tìm thấy đơn hàng cần xác nhận.')
      }

      // Cập nhật đơn hàng thành trạng thái "complete"
      const updatedOrder = await this.prismaService.order.update({
        where: {
          id: order.id,
        },
        data: {
          modified_at: new Date(utcPlus7Time),
          status: 'complete',
        },
      })

      const orderDetails = await this.prismaService.orderDetail.findMany({
        where:{
          order_id: order.id
        }
      })

      for (const orderDetail of orderDetails) {
        await this.prismaService.product.update({
            where: {
                id: orderDetail.product_id,
            },
            data: {
                sold: {
                    increment: orderDetail.quantity,
                },
            },
        });
      }
      
      // Trả về đơn hàng sau khi đã được cập nhật
      return updatedOrder
    } catch (error) {
      // Xử lý các ngoại lệ xảy ra trong quá trình xác nhận đơn hàng
      console.error('Lỗi khi xác nhận đơn hàng:', error.message)
      throw new Error('Đã xảy ra lỗi khi xác nhận đơn hàng.')
    }
  }

  async cancelOrder(orderId: number) {
    try {
      // Tìm đơn hàng thỏa mãn điều kiện
      const order = await this.prismaService.order.findFirst({
        where: {
          id: orderId,
          status: 'wait to confirm',
        },
      })

      // Nếu không tìm thấy đơn hàng, ném ra một ngoại lệ
      if (!order) {
        throw new Error('Không tìm thấy đơn hàng cần xác nhận.')
      }

      const currentUTCTime = Date.now()
      const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000
      // Cập nhật đơn hàng thành trạng thái "cancel"
      const updatedOrder = await this.prismaService.order.update({
        where: {
          id: order.id,
        },
        data: {
          modified_at: new Date(utcPlus7Time),
          status: 'canceled',
        },
      })

      const OrderDetails = await this.prismaService.orderDetail.findMany({
        where:{
          order_id: order.id
        }
      })

      for (const orderDetail of OrderDetails) {
        await this.prismaService.product.update({
            where: {
                id: orderDetail.product_id,
            },
            data: {
                quantity: {
                    increment: orderDetail.quantity,
                },
            },
        });
      }

      // Trả về đơn hàng sau khi đã được cập nhật
      return updatedOrder
    } catch (error) {
      // Xử lý các ngoại lệ xảy ra trong quá trình xác nhận đơn hàng
      console.error('Lỗi khi xác nhận đơn hàng:', error.message)
      throw new Error('Đã xảy ra lỗi khi xác nhận đơn hàng.')
    }
  }

  async searchProductsByDateRange(startDate: string, endDate: string) {
    const startDateTime = new Date(startDate)
    const endDateTime = new Date(endDate)

    // Thực hiện truy vấn để tìm kiếm sản phẩm trong khoảng thời gian
    const order = await this.prismaService.order.findMany({
      where: {
        status: 'complete',
        modified_at: {
          gte: startDateTime, // Lớn hơn hoặc bằng startDateTime
          lte: endDateTime, // Nhỏ hơn hoặc bằng endDateTime
        },
      },
    })

    let total = 0
    order.forEach((detail) => {
      total += detail.total
    })
    return order
  }

  async getAllComplete() {
    return this.prismaService.order.findMany({
      where: {
        status: 'complete',
      },
    })
  }

  async getOrderCompleteId(id: number): Promise<OrderDetail[]> {
    return this.prismaService.orderDetail.findMany({
      where: {
        order: {
          id: id,
          status: 'complete',
        },
      },
    })
  }

  async getAllCancel() {
    return this.prismaService.order.findMany({
      where: {
        status: 'canceled',
      },
    })
  }

  async orderInOrder(userId: number) {
    const user = await this.prismaService.order.findMany({
      where: {
        user_id: userId,
        status: 'wait to confirm',
      },
    })

    return user
  }

  async userOrderWait(orderId: number) {
    const Order = await this.prismaService.order.findUnique({
      where: {
        id: orderId
      },
    })

    return Order
  }

  async inOrderDetail(orderId: number) {
    return this.prismaService.orderDetail.findMany({
      where: {
        order: {
          id: orderId,
          status: 'wait to confirm',
        },
      },
    })
  }

  async userOrderComplete(userId: number) {
    const user = await this.prismaService.order.findMany({
      where: {
        user_id: userId,
        status: 'complete',
      },
    })

    return user
  }
}
