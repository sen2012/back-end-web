import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/prisma.service'
import * as cors from 'cors'
import * as express from 'express'

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
