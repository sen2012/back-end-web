import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService){}
    
    async addOrder(userId: number){
        const incompleteOrder = await this.prismaService.order.findFirst({
            where: {
              user_id: userId,
              status: false, // Giả sử trạng thái chưa hoàn thành được đánh dấu là "incomplete"
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
                status: false,
            }
        })
    }
}
