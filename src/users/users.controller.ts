import {  Controller, Get,  Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/user.decorator';
import { MyJwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {

    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User){
        return user
    }

    @Put(':id')
    updateMe(){
        
    }
}
