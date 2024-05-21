import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { OrderService } from './order.service'
import { MyJwtGuard } from 'src/auth/guard'
import { GetUser } from 'src/auth/decorator'
import { User } from '@prisma/client'
import { AddOrder, OrderDto } from './order.model'
import { OrderDetailDto } from '../orderdetail/orderdetail.model'

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  //tạo một order
  @ApiBearerAuth()
  @ApiResponse({
    status: 'default',
    description: 'successful operation',
    type: AddOrder,
  })
  @UseGuards(MyJwtGuard)
  @Post()
  async addToCart(@GetUser() user: User) {
    const userId = user.id
    const order = await this.orderService.addOrder(userId)
    return order
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get()
  async getOrder() {
    return this.orderService.getOrder()
  }

  @ApiResponse({
    status: 201,
    description: 'successful operation',
    type: OrderDto,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  @Post('confirm/:orderId')
  async confirmOrder(@Param('orderId') orderId: string) {
    const confirm = await this.orderService.confirmOrder(parseInt(orderId, 10))
    return confirm
  }

  @ApiResponse({
    status: 201,
    description: 'successful operation',
    type: OrderDto,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  @Post('cancel/:orderId')
  async cancelOrder(@Param('orderId') orderId: string) {
    const cancel = await this.orderService.cancelOrder(parseInt(orderId, 10))
    return cancel
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get('find')
  async findOrder(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.orderService.searchProductsByDateRange(startDate, endDate)
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get('allcomplete')
  async allComplete() {
    return this.orderService.getAllComplete()
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  @Get('detail/:id')
  async getOrderCompleteId(@Param('id') id: string) {
    const OrderDetail = await this.orderService.getOrderCompleteId(
      parseInt(id, 10),
    )
    return OrderDetail
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get('allCancel')
  async allCancel() {
    return this.orderService.getAllCancel()
  }

  @UseGuards(MyJwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get('user/order')
  async inOrder(@GetUser() user: User) {
    const userId = user.id
    const order = this.orderService.orderInOrder(userId)
    return order
  }

  @ApiResponse({
    status: 201,
    description: 'successful operation',
    type: OrderDetailDto,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  @Get('inOrder/:orderId')
  async inOrderDetail(@Param('orderId') orderId: string) {
    const detail = await this.orderService.inOrderDetail(parseInt(orderId, 10))
    return detail
  }

  @UseGuards(MyJwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get('user/orderComplete')
  async userOrderComplete(@GetUser() user: User) {
    const userId = user.id
    const order = this.orderService.userOrderComplete(userId)
    return order
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: OrderDto,
  })
  @Get('user/orderWait/:orderId')
  async userOrderWait(@Param('orderId') orderId: string) {
    const order = await this.orderService.userOrderWait(parseInt(orderId, 10))
    return order
  }
}
