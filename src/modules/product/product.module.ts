import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PrismaService } from "src/prisma.service";
import * as cors from "cors";
import * as express from "express";

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const app = express();
    app.use(cors());
    consumer.apply(app).forRoutes("*");
  }
}
