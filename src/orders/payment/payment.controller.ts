import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from 'src/auth/dto';
import { PaymentService } from './payment.service';
import { MyJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';


@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    
    @ApiBearerAuth()
    @UseGuards(MyJwtGuard)
    @Post()
    async createPayment(@GetUser() user: User, @Body() createPaymentDto: CreatePaymentDto){
        const userId = user.id;
        const payment = await this.paymentService.createPayment(userId, createPaymentDto)
        return  payment
    }
}
