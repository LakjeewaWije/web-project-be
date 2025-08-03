import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProductDto } from './dto/add-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOperation({
    summary: 'Add Product',
    description: 'Add product',
  })
  @Post()
  async addProduct(@Body() dto: ProductDto, @Req() req: Request) {
    var res = await this.productsService.addProduct(dto);
    return { product: res };
  }

  @ApiOperation({
    summary: 'Get all products',
    description: 'Get all products',
  })
  @Get()
  async getAllProducts() {
    var res = await this.productsService.getAllProducts();
    return { products: res };
  }
}
