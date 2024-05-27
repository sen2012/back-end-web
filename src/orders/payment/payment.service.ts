import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreatePaymentDto } from 'src/auth/dto'
import { OrderService } from '../order/order.service'

@Injectable()
export class PaymentService {
  constructor(private prismaService: PrismaService) {}

  async createPayment(userId: number, createPaymentDto: CreatePaymentDto) {
    const incompleteOrder = await this.prismaService.order.findFirst({
      where: {
        user_id: userId,
        status: 'incomplete',
      },
    })
    const currentUTCTime = Date.now()
    const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000

    const totalAmount = incompleteOrder.total

    const newPayment = await this.prismaService.payment.create({
      data: {
        amount: totalAmount,
        payment_date: new Date(utcPlus7Time),
        payment_method: createPaymentDto.paymentMethod,
      },
    })

    const payment = newPayment.id

    const orderDetails = await this.prismaService.orderDetail.findMany({
      where: {
          order_id: incompleteOrder.id,
      },
    });

    await this.prismaService.order.update({
      where: {
        id: incompleteOrder.id,
      },
      data: {
        payment_id: payment,
        order_time: new Date(utcPlus7Time),
        status: 'wait to confirm',
      },
    })

    for (const orderDetail of orderDetails) {
      await this.prismaService.product.update({
          where: {
              id: orderDetail.product_id,
          },
          data: {
              quantity: {
                  decrement: orderDetail.quantity,
              },
          },
      });
    }

    await this.prismaService.order.create({
      data: {
        user_id: userId,
        create_at: new Date(utcPlus7Time),
        status: 'incomplete',
      },
    })

    return newPayment
  }

  async getPayment(){
    return this.prismaService.payment.findMany()
  }
}
