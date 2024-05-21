import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator'

export class DetailDto {
  @IsNotEmpty()
  product_name: string

  @IsNotEmpty()
  desciption: string

  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  unit: string

  @IsNotEmpty()
  quantity: number
}

export class UpdateProductDto {
  @ApiProperty({
    example: 'Laptop lenovo think pad idea',
  })
  @IsNotEmpty()
  @IsString()
  product_name: string

  @ApiProperty({
    example: 'sử dụng cpu i5-13500h, 1Tb dung lượng',
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    example: '400000',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty({
    example: 'Cái',
  })
  @IsString()
  @IsNotEmpty()
  unit: string

  @ApiProperty({
    example: 'Laptop.png',
  })
  @IsString()
  photo: string

  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number

  @ApiProperty({
    example: '10',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number
}

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop lenovo think pad idea',
  })
  @IsNotEmpty()
  @IsString()
  product_name: string

  @ApiProperty({
    example: 'sử dụng cpu i5-13500h, 1Tb dung lượng',
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    example: '400000',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty({
    example: 'Cái',
  })
  @IsString()
  @IsNotEmpty()
  unit: string

  @ApiProperty({
    example: 'Laptop.png',
  })
  @IsString()
  photo: string

  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number

  @ApiProperty({
    example: '10',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number
}

export class FindProductDto {
  @ApiProperty({
    example: 'L',
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  categoryId?: number

  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  minPrice?: number

  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  maxPrice?: number
}
