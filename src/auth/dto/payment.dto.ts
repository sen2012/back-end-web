import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreatePaymentDto {
  @ApiProperty({
    example: 'Thanh toán khi nhận hàng',
  })
  @IsString()
  paymentMethod: string
}
