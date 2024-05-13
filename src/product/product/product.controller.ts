import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateProductDto, FindProductDto, UpdateProductDto } from "src/auth/dto";
import { ProductService } from "./product.service";
import { Product } from "@prisma/client";


@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProduct(): Promise<Product[]> {
    return await this.productService.getProduct();
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    return product; // You can return the created product as a response
  }

  @Get(":id")
  async getProductById(@Param("id") id: string): Promise<Product> {
    const product = await this.productService.getProductById(
      parseInt(id, 10),
    );
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Put(":id")
  async updateProduct(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct= await this.productService.updateProduct(
      parseInt(id, 10),
      updateProductDto,
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    const deletedProduct = await this.productService.deleteProduct(
      parseInt(id, 10),
    );
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} has been deleted` };
  }
  //tìm kiếm theo tên product
  @Post('/search')
  async search(@Body() findProductDto: FindProductDto){
    const product = await this.productService.searchProduct(findProductDto);
    return product;
  }
}
