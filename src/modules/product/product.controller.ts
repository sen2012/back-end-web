import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "src/auth/dto";
import { ProductService } from "./product.service";

@ApiBearerAuth()
@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return;
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    return product; // You can return the created product as a response
  }

  @Get(":id")
  detailProduct() {
    return;
  }

  @Put(":id")
  updateProduct() {
    return;
  }

  @Delete(":id")
  deleteProduct() {
    return;
  }
}
