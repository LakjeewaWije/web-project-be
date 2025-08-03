import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { ProductDto } from './dto/add-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async addProduct(dto: ProductDto): Promise<Product | any> {
    try {
      const addProductDao: Product = {
        productName: dto.productName,
        productDescription: dto.productDescription,
        productBrand: dto.productBrand,
        status: dto.status,
        productCategory: dto.productCategory,
        price: dto.price,
        weight: dto.weight,
        images: [],
      };

      const res = await this.productsRepository.save(addProductDao);

      for (const image of dto.images as any) {
        const imageDao: Image = {
          product: res,
          url: image,
        };
        await this.imagesRepository.save(imageDao);
      }

      const final = await this.productsRepository.findOne({
        where: {
          productId: res.productId,
        },
        relations: { images: true },
      });

      return final;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const res = await this.productsRepository.find({
        relations: { images: true },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
