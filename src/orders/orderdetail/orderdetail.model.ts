import { ApiProperty } from '@nestjs/swagger'
import { OrderDetail } from '@prisma/client'

export class OrderDetailDto implements OrderDetail {
  @ApiProperty()
  id: number

  @ApiProperty()
  price: number

  @ApiProperty()
  order_id: number

  @ApiProperty()
  product_id: number

  @ApiProperty()
  quantity: number
}

export class AddCart
  implements Pick<OrderDetailDto, 'price' | 'product_id' | 'quantity'>
{
  @ApiProperty()
  price: number

  @ApiProperty()
  product_id: number

  @ApiProperty()
  quantity: number
}

export class UpdateCart
  implements Pick<OrderDetailDto, 'product_id' | 'quantity'>
{
  @ApiProperty()
  product_id: number

  @ApiProperty()
  quantity: number
}
