import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {
  CreateProductDto,
  FindProductDto,
  UpdateProductDto,
} from 'src/auth/dto'
import { ProductService } from './product.service'
import { Product } from '@prisma/client'
import { ProductDto } from './product.model'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: ProductDto,
  })
  @Get()
  async getProduct(): Promise<Product[]> {
    return await this.productService.getProduct()
  }

  @ApiResponse({
    status: 201,
    description: 'Create product success',
    type: ProductDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFile() image: Express.Multer.File) {
    const product = await this.productService.createProduct(createProductDto)
    return product // You can return the created product as a response
  }

  @Post('local')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './image',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      data: file.path,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'successful operation',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(parseInt(id, 10))
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product
  }

  @ApiResponse({
    status: 201,
    description: 'Update product success',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.updateProduct(
      parseInt(id, 10),
      updateProductDto,
    )
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return updatedProduct
  }

  @ApiResponse({
    status: 200,
    description: 'Delete product success',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(
      parseInt(id, 10),
    )
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return { message: `Product with ID ${id} has been deleted` }
  }

  //tìm kiếm theo tên product
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: ProductDto,
  })
  @Post('/search')
  async search(@Body() findProductDto: FindProductDto) {
    const product = await this.productService.searchProduct(findProductDto)
    return product
  }
}
