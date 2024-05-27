import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserDTO implements User {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  name: string

  @ApiProperty()
  address: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  province: string

  @ApiProperty()
  create_at: Date

  @ApiProperty()
  role_id: number
}

export class Login implements Pick<User, 'id' | 'email' | 'password'> {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

export class UpdateRoleDto implements Pick<User, 'id' | 'role_id'> {
  @ApiProperty()
  id: number

  @ApiProperty()
  role_id: number
}
