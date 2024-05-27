import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProductModule } from './product/product/product.module'
import { CategoryModule } from './product/category/category.module'
import { PostModule } from './post/post.module'
import { OrderModule } from './orders/order/order.module'
import { PaymentModule } from './orders/payment/payment.module'
import { RoleModule } from './users/role/role.module'
import { OrderdetailModule } from './orders/orderdetail/orderdetail.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    ProductModule,
    CategoryModule,
    PostModule,
    OrderModule,
    PaymentModule,
    RoleModule,
    OrderdetailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
