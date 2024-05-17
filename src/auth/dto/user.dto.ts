import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
  Validate,
} from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    example: 'banh',
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: '089999999',
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10, { message: 'Phone number must have 10 digits' })
  phone: string

  @ApiProperty({
    example: 'Lê Ngô Cát',
  })
  @IsNotEmpty()
  @IsString()
  address: string

  @ApiProperty({
    example: 'Thừ thiên Huế',
  })
  @IsNotEmpty()
  @IsString()
  province: string
}

export class ChangePasswordDto {
  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @ApiProperty({
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string

  @ApiProperty({
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmNewPassword: string
}

export class UpdateRoleDto {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  role_id: number
}
