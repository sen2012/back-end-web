import { Body, Controller, Get, NotFoundException, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { MyJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@ApiTags("Order")
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

  //tạo một order
  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @Post()
  async addToCart(@GetUser() user: User) {
    const userId = user.id;
    const order = await this.orderService.addOrder(userId);
    return order
  }
  
  @Get()
  async getOrder(){
    return this.orderService.getOrder()
  }

  @Post('confirm/:orderId')
  async confirmOrder(@Param('orderId') orderId: string){
    const confirm = await this.orderService.confirmOrder(
      parseInt(orderId, 10)
    );
    return confirm
  }

  @Post('cancel/:orderId')
  async cancelOrder(@Param('orderId') orderId: string){
    const cancel = await this.orderService.cancelOrder(
      parseInt(orderId, 10)
    );
    return cancel
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

  @Get('allCancel')
  async allCancel(){
    return this.orderService.getAllCancel()
  }
}
