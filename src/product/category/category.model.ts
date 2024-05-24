import { ApiProperty } from '@nestjs/swagger'
import { Categories } from '@prisma/client'

export class CategoryDto implements Categories {
  @ApiProperty()
  id: number

  @ApiProperty()
  category_name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  type: string
}
