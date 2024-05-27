import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";

export class PostDto implements Post {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    title: string;
}