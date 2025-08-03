import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductDto } from './dto/add-product.dto';
import { ProductsService } from './products.service';
import { Public } from 'src/utils/publicRequest.decorator';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auths/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('products')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
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

  @ApiOperation({
    summary: 'Get Single Product Detail',
    description: 'Get single Product detail',
  })
  @Public()
  @Get(`/:productId`)
  async getProductById(@Param('productId') productId: UUID) {
    var res = await this.productsService.getProductById(productId);
    return { product: res };
  }
}
