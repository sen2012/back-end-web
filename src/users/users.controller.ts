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
} from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator/user.decorator'
import { MyJwtGuard } from '../auth/guard'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UsersService } from './users.service'
import { ChangePasswordDto, UpdateRoleDto, UpdateUserDto } from 'src/auth/dto'
import { UserDTO } from './user.model'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: UserDTO,
  })
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user
  }

  @ApiBearerAuth()
  @UseGuards(MyJwtGuard)
  @ApiResponse({
    status: 201,
    description: 'update user inform success',
    type: UserDTO,
  })
  @Put('me')
  async updateCurrentUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = user.id // Assuming you have stored the user ID in the request object after authentication
    if (!userId) {
      throw new NotFoundException('User not found')
    }
    const updatedUser = await this.usersService.updateUser(
      userId,
      updateUserDto,
    )
    return updatedUser
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'delete user success',
    type: UserDTO,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.usersService.deleteUser(parseInt(id, 10))
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return { message: `User with ID ${id} has been deleted` }
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers()
  }

  @ApiResponse({
    status: 201,
    description: 'Change password success',
    type: ChangePasswordDto,
  })
  @ApiBearerAuth()
  @Post('change-password')
  @UseGuards(MyJwtGuard)
  async changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = user.id // Lấy id của người dùng từ JWT payload

    // Thực hiện logic thay đổi mật khẩu (kiểm tra mật khẩu cũ, cập nhật mật khẩu mới, vv.)
    const result = await this.usersService.changePassword(
      userId,
      changePasswordDto,
    )

    return result
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: UserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get('search/:name')
  async searchName(@Param('name') name: string) {
    return this.usersService.searchName(name)
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: UserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get('infor/:id')
  async getProductById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserId(parseInt(id, 10))
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  @ApiResponse({
    status: 201,
    description: 'Update Role success',
    type: UpdateRoleDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Put('update/:id')
  async updateRole(@Param('id') id: string, @Body() updateRole: UpdateRoleDto) {
    const user = await this.usersService.updateRole(
      parseInt(id, 10),
      updateRole,
    )
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }
}
