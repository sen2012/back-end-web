import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class CreateOrderDetailDto {
  @ApiProperty({
    example: '400000',
  })
  @IsNumber()
  @Optional()
  price?: number

  @ApiProperty({
    example: '2',
  })
  @IsNumber()
  @Optional()
  productId?: number

  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @Optional()
  quantity?: number
}

export class UpdateOrderDetailDto {
  @ApiProperty({
    example: '2',
  })
  @IsNumber()
  id: number

  @ApiProperty({
    example: '2',
  })
  @IsNumber()
  quantity: number
}

export class DeleteDto {
  @IsNumber()
  id: number
}
