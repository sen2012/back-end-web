import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Laptop',
  })
  @IsNotEmpty()
  @IsString()
  category_name: string

  @ApiProperty({
    example: 'msi',
  })
  @IsNotEmpty()
  @IsString()
  description: string
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Ram PC',
  })
  @IsNotEmpty()
  @IsString()
  category_name: string

  @ApiProperty({
    example: 'lenovo',
  })
  @IsNotEmpty()
  @IsString()
  description: string
}

export class SearchDto {
  @ApiProperty({
    example: 'MSI',
  })
  @IsString()
  category_name: string
}

export class SearchNameDto {
  @ApiProperty({
    example: 'L',
  })
  @IsString()
  category_name: string
}
