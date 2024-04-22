import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "../auth/decorator/user.decorator";
import { MyJwtGuard } from "../auth/guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateUser } from "src/auth/dto";

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
  @Put(":id")
  async updateUser(@Param("id") id: number, @Body() updateData: UpdateUser) {
    const updatedUser = await this.usersService.updateUser(id, updateData);
    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }
    return updatedUser;
  }
}
