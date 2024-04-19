import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma.service';
import * as cors from 'cors';
import * as express from 'express';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService]
  
})
export class CategoryModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    const app = express();
    app.use(cors());
    consumer.apply(app).forRoutes('*');
  }
}
