import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Image } from './entity/image.entity';
import { ProductDto } from './dto/add-product.dto';
import { UUID } from 'crypto';
import { GetProductDto } from './query/get-product.dto';

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

  async getProductById(id: UUID): Promise<Product | any> {
    try {
      const res = await this.productsRepository.findOne({
        where: { productId: id },
        relations: { images: true },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsFilter(
    queryParams?: GetProductDto,
  ): Promise<{ products: Product[]; totalCount: number }> {
    const options: FindManyOptions<Product> = {
      relations: { images: true },
    };
    console.log('Ohhbhai firsttttt');
    if (queryParams) {
      if (queryParams.productBrand) {
        options.where = {
          ...options.where,
          productBrand: queryParams.productBrand,
        };
      }

      if (queryParams.productCategory) {
        options.where = {
          ...options.where,
          productCategory: queryParams.productCategory,
        };
      }

      // Apply sorting based on query parameter
      // if (queryParams.sort) {
      //   const [sortField, sortOrder] = queryParams.sort.split(',');
      //   options.order = { [sortField]: sortOrder.toUpperCase() };
      // }

      if (queryParams.pageNumber && queryParams.pageSize) {
        const { pageNumber, pageSize } = queryParams;
        const skip = (pageNumber - 1) * pageSize;
        options.skip = skip;
        options.take = pageSize;
      }
    }

    const [products, totalCount] = await Promise.all([
      this.productsRepository.find(options),
      this.productsRepository.count(options),
    ]);

    return { products: products, totalCount };
  }
}
