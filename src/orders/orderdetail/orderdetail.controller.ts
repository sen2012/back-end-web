import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from 'src/auth/dto/orderdetail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MyJwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@ApiTags("OrderDetail")
@Controller('orderdetail')
export class OrderdetailController {
    constructor(private orderdetailService: OrderdetailService){

    }

  @UseGuards(MyJwtGuard)
  @Post()
  async addToCart(@Request() req,@Body() create: CreateOrderDetailDto ) {
    const userId = req.user.id;
    const order = await this.orderdetailService.addToCart(userId, create);
    return order
  }

  @UseGuards(MyJwtGuard)
  @Get('cart')
  async getCart(@Request() req){
    const userId = req.user.id
    const cart = await this.orderdetailService.getOrder(userId)
    return cart
  }

  @Put('update' )
  async updateCart( @Body() updateOrderDetailDto : UpdateOrderDetailDto){
    return this.orderdetailService.updateCart(updateOrderDetailDto)
  }

  @Delete('delete/:id')
  async deleteOrderDetail(@Param("id") id: string){
    const OrderDetail = await this.orderdetailService.deleteOrderDetail(
      parseInt(id, 10),
    );
    if (!OrderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return { message: `OrderDetail with ID ${id} has been deleted` };
  }
}
