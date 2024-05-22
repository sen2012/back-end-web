import { ApiProperty } from "@nestjs/swagger";
import { Payment } from "@prisma/client";

export class PaymentDto implements Payment{

    @ApiProperty()
    id: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    payment_date: Date;

    @ApiProperty()
    payment_method: string;
}