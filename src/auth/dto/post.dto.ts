import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({
    example: 'giamgia.png',
  })
  image: string

  @ApiProperty({
    example: 'Giảm giá',
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    example: 'Giảm giá laptop lên đến 10% cho sinh viên ',
  })
  @IsNotEmpty()
  @IsString()
  content: string

  @ApiProperty({
    example: 'true',
  })
  published: boolean
}

export class UpdatePostDto {
  @ApiProperty({
    example: 'd.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty({
    example: 'Giảm giá',
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    example: 'Giảm giá laptop lên đến 10% cho sinh viên ',
  })
  @IsNotEmpty()
  @IsString()
  content: string

  @ApiProperty({
    example: 'true',
  })
  @IsNotEmpty()
  @IsBoolean()
  published: boolean
}
