import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DetailDto {

    @IsNotEmpty()
    product_name: string

    @IsNotEmpty()
    desciption: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    unit: string


}
export class CreateProductDto {

    @ApiProperty({
        example: "Laptop lenovo think pad idea"
    })
    @IsNotEmpty()
    product_name: string

    @ApiProperty({
        example: "sử dụng cpu i5-13500h, 1Tb dung lượng"
    })
    @IsNotEmpty()
    description: string

    @ApiProperty({
        example: "400000"
    })
    @IsNotEmpty()
    price: number

    @ApiProperty({
        example: "Cái"
    })
    @IsNotEmpty()
    unit: string
    
    @ApiProperty({
        example: "Laptop.png"
    })
    photo: string

    @ApiProperty({
        example: "1"
    })
    @IsNotEmpty()
    category_id: number


}