import { ApiProperty } from '@nestjs/swagger'
import { Product } from '@prisma/client'

export class ProductDto implements Product {
  @ApiProperty()
  id: number

  @ApiProperty()
  product_name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  photo: string

  @ApiProperty()
  category_id: number

  @ApiProperty()
  price: number

  @ApiProperty()
  unit: string

  @ApiProperty()
  create_at: Date

  @ApiProperty()
  quantity: number

  @ApiProperty()
  sold: number
}
