import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard';

@Controller('users')
export class UsersController {

    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User){
        return user
    }
}
