import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService){

    }

    async createProduct(createProductDto: CreateProductDto): Promise<any> {
        const product = await this.prismaService.product.create({
          data: {
            product_name: createProductDto.product_name,
            description: createProductDto.description,
            price: createProductDto.price,
            photo: createProductDto.photo,
            unit: createProductDto.unit,
            category_id: createProductDto.category_id,
            create_at: new Date,
          },
        });
        return product;
      }
}
