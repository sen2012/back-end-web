import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserDTO implements  User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    province: string;

    @ApiProperty()
    create_at: Date;

    @ApiProperty()
    role_id: number;
}


export class aaa implements Pick<User, "id" | "email"> {
    id: number;
    email: string;
}