import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from 'src/auth/dto/orderdetail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MyJwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';


@ApiTags("OrderDetail")
@Controller('orderdetail')
export class OrderdetailController {
    constructor(private orderdetailService: OrderdetailService){

    }

  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @Post()
  async addToCart(@GetUser() user: User, @Body() create: CreateOrderDetailDto ) {
    const userId = user.id;
    const order = await this.orderdetailService.addToCart(userId, create);
    return order
  }

  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @Get('cart')
  async getCart(@GetUser() user: User){
    const userId = user.id
    const cart = await this.orderdetailService.getOrderDetail(userId)
    return cart
  }

  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @Put('update' )
  async updateCart(@GetUser() user: User, @Body() updateOrderDetailDto : UpdateOrderDetailDto){
    const userId = user.id
    const update = await this.orderdetailService.updateCart(userId, updateOrderDetailDto)
    return update
  }

  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @Delete('delete/:id')
  async deleteOrderDetail(@GetUser() user: User, @Param("id") detailId: string){
    const userId = user.id
    const OrderDetail = await this.orderdetailService.deleteOrderDetail(userId,
      parseInt(detailId, 10)
    );
    if (!OrderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${detailId} not found`);
    }
    return { message: `OrderDetail with ID ${detailId} has been deleted` };
  }
}
