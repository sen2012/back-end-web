import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AdminRegisterDto, AuthDto, RegisterDto } from './dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Login, UserDTO } from 'src/users/user.model'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Register success',
    type: UserDTO,
  })
  @ApiResponse({ status: 403, description: 'Email already exist' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login success', type: Login })
  @ApiResponse({ status: 404, description: 'Login fail' })
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto)
  }

  @Post('admin-register')
  @ApiResponse({
    status: 201,
    description: 'Register success',
    type: UserDTO,
  })
  @ApiResponse({ status: 403, description: 'Email already exist' })
  adminRegister(@Body() adminRegisterDto: AdminRegisterDto) {
    return this.authService.registerAdmin(adminRegisterDto)
  }
}
