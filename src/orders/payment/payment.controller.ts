import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePaymentDto } from 'src/auth/dto'
import { PaymentService } from './payment.service'
import { MyJwtGuard } from 'src/auth/guard'
import { GetUser } from 'src/auth/decorator'
import { User } from '@prisma/client'
import { PaymentDto } from './payment.model'

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @ApiResponse({
    status: 201,
    description: "successful operation",
    type: PaymentDto
  })
  @Post()
  async createPayment(
    @GetUser() user: User,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    const userId = user.id
    const payment = await this.paymentService.createPayment(
      userId,
      createPaymentDto,
    )
    return payment
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "successful operation",
    type: PaymentDto
  })
  async getPayment(){
    return this.paymentService.getPayment()
  }
}
