import { ApiProperty } from '@nestjs/swagger'
import { Order } from '@prisma/client'

export class OrderDto implements Order {
  @ApiProperty()
  id: number

  @ApiProperty()
  create_at: Date

  @ApiProperty()
  modified_at: Date

  @ApiProperty()
  order_time: Date

  @ApiProperty()
  payment_id: number

  @ApiProperty()
  status: string

  @ApiProperty()
  total: number

  @ApiProperty()
  user_id: number
}

export class AddOrder
  implements Pick<OrderDto, 'id' | 'create_at' | 'status' | 'user_id'>
{
  @ApiProperty()
  id: number

  @ApiProperty()
  create_at: Date

  @ApiProperty()
  status: string

  @ApiProperty()
  user_id: number
}
