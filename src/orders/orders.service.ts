import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { OrderEntity } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
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
