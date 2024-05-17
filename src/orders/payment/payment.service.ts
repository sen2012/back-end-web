import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePaymentDto } from 'src/auth/dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class PaymentService {
    constructor(private prismaService : PrismaService){}
    
    async createPayment(userId: number, createPaymentDto: CreatePaymentDto){
        const incompleteOrder = await this.prismaService.order.findFirst({
            where: {
              user_id: userId,
              status: 'incomplete', 
            },
        });
        
        const totalAmount = incompleteOrder.total

        const newPayment = await this.prismaService.payment.create({
            data: {
                amount: totalAmount,
                payment_date: new Date(),
                payment_method: createPaymentDto.paymentMethod
            }
        })

        const payment = newPayment.id

        await this.prismaService.order.update({
            where:{
                id: incompleteOrder.id
            },
            data:{
                payment_id: payment,
                order_time: new Date(),
                status: 'wait to confirm'
            }
        })

        await this.prismaService.order.create({
            data:{
                user_id: userId,
                create_at: new Date(),
                status: 'incomplete',
            }
        })

        return newPayment
    }
}
