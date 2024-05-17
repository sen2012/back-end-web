import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('List API')
    .addServer('http://localhost:3000/')
    .setVersion('3.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Product')
    .addTag('Category')
    .addTag('Post')
    .addTag('Order')
    .addTag('Payment')
    .addTag('OrderDetail')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
