import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from 'src/auth/dto';
import { PaymentService } from './payment.service';
import { MyJwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @UseGuards(MyJwtGuard)
    @Post()
    async createPayment(@Request() req,@Body() createPaymentDto: CreatePaymentDto){
        const userId = req.user.id;
        const payment = await this.paymentService.createPayment(userId, createPaymentDto)
        return  payment
    }
}
