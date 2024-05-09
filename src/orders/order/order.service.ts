import { Injectable } from '@nestjs/common';
import { OrderDetail } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService){}
    
    async addOrder(userId: number){
        const incompleteOrder = await this.prismaService.order.findFirst({
            where: {
              user_id: userId,
              status: 'incomplete', // Giả sử trạng thái chưa hoàn thành được đánh dấu là "incomplete"
            },
        });
        if(!incompleteOrder){
            await this.add(userId)
        }
    }

    async add(userId: number){
        const newOrder = await this.prismaService.order.create({
            data:{
                user_id: userId,
                create_at: new Date(),
                status: 'incomplete',
            }
        })
    }

    async getOrder(){
        return this.prismaService.order.findMany({
            where:{
                status: 'wait to confirm'
            }
        })
    }

    async confirmOrder(orderId: number){

        const order = await this.prismaService.order.findFirst({
            where: {
                id: orderId,
                status: "wait to confirm",
            },
        });

        return this.prismaService.order.update({
            where:{
                id: order.id
            },
            data:{
                modified_at: new Date(),
                status: 'complete'
            }
        })
    }

    async cancelOrder(orderId: number){
        const order = await this.prismaService.order.findFirst({
            where: {
                id: orderId,
                status: "wait to confirm",
            },
        });

        return this.prismaService.order.update({
            where:{
                id: order.id
            },
            data:{
                modified_at: new Date(),
                status: 'canceled'
            }
        })
    }

    async searchProductsByDateRange( startDate: string, endDate: string) {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);

            // Thực hiện truy vấn để tìm kiếm sản phẩm trong khoảng thời gian
        const order = await this.prismaService.order.findMany({
            where: {
                status: 'complete',
                modified_at: {
                    gte: startDateTime, // Lớn hơn hoặc bằng startDateTime
                    lte: endDateTime,   // Nhỏ hơn hoặc bằng endDateTime
                },
            },
        });

        let total = 0;
        order.forEach((detail) => {
          total += detail.total
        });
        return order;
    }

    async getAllComplete(){
        return this.prismaService.order.findMany({
            where:{
                status: 'complete'
            }
        })
    }

    async getOrderCompleteId(id: number): Promise<OrderDetail[]>{
        return this.prismaService.orderDetail.findMany({
            where:{
                order:{
                    id: id,
                    status: 'complete'
                }
            }
        })
    }
}
