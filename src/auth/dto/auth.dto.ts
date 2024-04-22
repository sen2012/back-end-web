import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @ApiProperty({
    example: "tue@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "123",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    example: "ete@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "123",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "tue",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "bach dang",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "0761231231",
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "thanh pho hue",
  })
  @IsString()
  @IsNotEmpty()
  province: string;
}
