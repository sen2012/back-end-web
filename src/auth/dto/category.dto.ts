import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Laptop"
    })
    @IsNotEmpty()
    @IsString()
    category_name: string

    @ApiProperty({
        example: "msi"
    })
    @IsNotEmpty()
    @IsString()
    description: string
}