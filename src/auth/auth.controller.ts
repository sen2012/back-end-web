import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminRegisterDto, AuthDto, RegisterDto } from "./dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @ApiResponse({ status: 201, description: "Login success" })
  @ApiResponse({ status: 404, description: "Login fail" })
  login(@Body() authDto: AuthDto) {
    return this.authService.login( authDto);
  }

  @Post("admin-register")
  adminRegister(@Body() adminRegisterDto: AdminRegisterDto){
    return this.authService.registerAdmin(adminRegisterDto)
  }
}
