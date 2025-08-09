import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { OrderEntity } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/user.entity';
import { OrderToProductEntity } from './entity/order-to-product.entity';
import { CheckoutDto } from './dto/checkout.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(OrderToProductEntity)
    private orderToProductRepository: Repository<OrderToProductEntity>,
  ) {}

  async getAllOrders(userId: UUID): Promise<OrderEntity[]> {
    try {
      const res = await this.ordersRepository.find({
        where: { user: { userId } },
        relations: { orderToProducts: { product: true } },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getOrderByOrderId(id: UUID): Promise<OrderEntity | any> {
    try {
      const res = await this.ordersRepository.findOne({
        where: { orderId: id },
        relations: {
          orderToProducts: { product: true },
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
