import { Body, Controller, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/auth/dto';
import { MyJwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@ApiTags("Order")
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

    @UseGuards(MyJwtGuard)
    @Post()
    async addToCart(@Request() req) {
    const userId = req.user.id;
    const order = await this.orderService.addOrder(userId);
    return order
  }
}
