import { Body, Controller, Get, NotFoundException, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { MyJwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@ApiTags("Order")
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

  //tạo một order
  @UseGuards(MyJwtGuard)
  @Post()
  async addToCart(@Request() req) {
    const userId = req.user.id;
    const order = await this.orderService.addOrder(userId);
    return order
  }
  
  @Get()
  async getOrder(){
    return this.orderService.getOrder()
  }

  @Post('confirm')
  async confirmOrder(@Param('id') orderId: number){
    return this.orderService.confirmOrder(orderId)
  }

  @Post('cancel')
  async cancelOrder(@Param('id') orderId: number){
    return this.orderService.cancelOrder(orderId)
  }

  @Get('find')
  async findOrder(@Query('start') startDate: string, @Query('end') endDate: string){
    return this.orderService.searchProductsByDateRange(startDate, endDate)
  }

  @Get('allcomplete')
  async allComplete(){
    return this.orderService.getAllComplete()
  }

  @Get('detail/:id')
  async getOrderCompleteId(@Param('id') id: string){
    const OrderDetail = await this.orderService.getOrderCompleteId(
      parseInt(id, 10)
    );
    return OrderDetail
  }
}
