import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService,
                private jwtService: JwtService,
                private configService: ConfigService,
    ){

    }

    async register(authDto: AuthDto){
        const hashedPassword = await argon.hash(authDto.password)

        try{
            const user = await this.prismaService.user.create({
                data:{
                    email: authDto.email,
                    password: hashedPassword,
                    name: authDto.name
                },
                select:{
                    id: true,
                    email: true,
                    name: true
                }
            })
            return await this.signJwtToken(user.id, user.email)
        }catch(error){
            if(error.code == 'P2002'){
                throw new ForbiddenException("Email already exists")
            }
        }

    }
    
    async login(authDto: AuthDto){
        const user = await this.prismaService.user.findUnique({
            where:{
                email: authDto.email
            }
        })
        if(!user){
            throw new ForbiddenException(
                'User not found'
            )
        }
        const passwordMatched = await argon.verify(
            user.password,
            authDto.password
        )
        if(!passwordMatched) {
            throw new ForbiddenException(
                'Incorrect password'
            )
        }
        delete user.password

        return await this.signJwtToken(user.id, user.email)
    }
    async signJwtToken (userId: number, email: string):Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        }
    }
}
