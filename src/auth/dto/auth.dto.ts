import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  MinLength,
  Validate,
} from 'class-validator'

export class AuthDto {
  @ApiProperty({
    example: 'tue@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string
}

export class RegisterDto {
  @ApiProperty({
    example: 'ete@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string

  @ApiProperty({
    example: 'tue',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'bach dang',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({
    example: '0761231231',
  })
  @IsNumberString()
  @Length(10, 10, { message: 'Phone number must have 10 digits' })
  @IsNotEmpty()
  phone: string

  @ApiProperty({
    example: 'thanh pho hue',
  })
  @IsString()
  @IsNotEmpty()
  province: string
}

export class AdminRegisterDto {
  @ApiProperty({
    example: 'tue@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string

  @ApiProperty({
    example: 'tue',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'bach dang',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({
    example: '0761231231',
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10, { message: 'Phone number must have 10 digits' })
  phone: string

  @ApiProperty({
    example: 'thanh pho hue',
  })
  @IsString()
  @IsNotEmpty()
  province: string
}
