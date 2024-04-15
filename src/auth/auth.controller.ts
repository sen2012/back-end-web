import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @Post('register')
    register(@Body() authDto: AuthDto){

        return this.authService.register(authDto);
    }

    @Post('login')
    login(@Body() authDto: AuthDto){
        return this.authService.login(authDto);
    }
}
