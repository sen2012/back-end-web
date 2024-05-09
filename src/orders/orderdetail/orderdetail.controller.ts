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
    const cart = await this.orderdetailService.getOrderDetail(userId)
    return cart
  }

  @UseGuards(MyJwtGuard)
  @Put('update' )
  async updateCart(@Request() req, @Body() updateOrderDetailDto : UpdateOrderDetailDto){
    const userId = req.user.id
    const update = await this.orderdetailService.updateCart(userId, updateOrderDetailDto)
    return update
  }

  @UseGuards(MyJwtGuard)
  @Delete('delete/:id')
  async deleteOrderDetail(@Request() req, @Param("id") detailId: string){
    const userId = req.user.id
    const OrderDetail = await this.orderdetailService.deleteOrderDetail(userId,
      parseInt(detailId, 10)
    );
    if (!OrderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${detailId} not found`);
    }
    return { message: `OrderDetail with ID ${detailId} has been deleted` };
  }
}
