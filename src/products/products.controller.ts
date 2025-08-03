import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProductDto } from './dto/add-product.dto';

@Controller('products')
export class ProductsController {
  @ApiOperation({
    summary: 'Add Product',
    description: 'Add product',
  })
  @Post()
  async addProduct(@Body() dto: ProductDto, @Req() req: Request) {
    return true;
  }
}
