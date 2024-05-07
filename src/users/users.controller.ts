import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/decorator/user.decorator";
import { MyJwtGuard } from "../auth/guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { ChangePasswordDto, UpdateUserDto } from "src/auth/dto";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(MyJwtGuard)
  @Get("me")
  me(@GetUser() user: User) {
    return user;
  }

  @UseGuards(MyJwtGuard)
  @Put("me")
  async updateCurrentUser(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const userId = req.user.id; // Assuming you have stored the user ID in the request object after authentication
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    return updatedUser;
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    const deletedUser = await this.usersService.deleteUser(
      parseInt(id, 10),
    );
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} has been deleted` };
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Post('change-password')
  @UseGuards(MyJwtGuard) // Use Guard if using JWT auth
  async changePassword(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.id; // Lấy id của người dùng từ JWT payload

    // Thực hiện logic thay đổi mật khẩu (kiểm tra mật khẩu cũ, cập nhật mật khẩu mới, vv.)
    const result = await this.usersService.changePassword(userId, changePasswordDto);
    
    return result;
  }
}
