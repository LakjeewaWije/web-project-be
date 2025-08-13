import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Product } from 'src/products/entity/product.entity';
import { OrderToProductEntity } from './entity/order-to-product.entity';
import { OrderEntity } from './entity/order.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderToProductEntity,
      User,
      Product,
    ]),
    MailerModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
