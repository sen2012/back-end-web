import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import * as argon from 'argon2'
import {
  AdminRegisterDto,
  AuthDto,
  ChangePasswordDto,
  RegisterDto,
} from './dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //user register
  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new ConflictException('Passwords do not match')
    }

    const currentUTCTime = Date.now()
    const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000
    const hashedPassword = await argon.hash(registerDto.password)

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          name: registerDto.name,
          province: registerDto.province,
          phone: registerDto.phone,
          address: registerDto.address,
          create_at: new Date(utcPlus7Time),
          role_id: 1,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      })
      return await this.signJwtToken(user.id, user.email)
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('Email already exists')
      }
    }
  }

  //admin register
  async registerAdmin(adminRegisterDto: AdminRegisterDto) {
    if (adminRegisterDto.password !== adminRegisterDto.confirmPassword) {
      throw new ConflictException('Passwords do not match')
    }

    const currentUTCTime = Date.now()
    const utcPlus7Time = currentUTCTime + 7 * 60 * 60 * 1000
    const hashedPassword = await argon.hash(adminRegisterDto.password)

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: adminRegisterDto.email,
          password: hashedPassword,
          name: adminRegisterDto.name,
          province: adminRegisterDto.province,
          phone: adminRegisterDto.phone,
          address: adminRegisterDto.address,
          create_at: new Date(utcPlus7Time),
          role_id: 2,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      })
      return await this.signJwtToken(user.id, user.email)
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('Email already exists')
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })
    if (user && user.password === password) {
      return user
    }
    return null
  }

  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    })
    if (!user) {
      throw new ForbiddenException('User not found')
    }
    const passwordMatched = await argon.verify(user.password, authDto.password)
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password')
    }
    return await this.signJwtToken(user.id, user.email)
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    }
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: this.configService.get('JWT_SECRET'),
    })
    return {
      accessToken: jwtString,
    }
  }
}
