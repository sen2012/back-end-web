import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import * as cors from 'cors';
import * as express from 'express';

@Module({
  imports: [JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [PrismaService]
})

export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        const app = express();
        app.use(cors());
        consumer.apply(app).forRoutes('*');
      }
}