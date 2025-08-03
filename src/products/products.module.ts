import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Image } from './entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
