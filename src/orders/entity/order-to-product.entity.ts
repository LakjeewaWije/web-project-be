import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Product } from 'src/products/entity/product.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderToProductEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  orderToProductId?: UUID;

  @Column({ type: 'numeric', nullable: false })
  public quantity: number;

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  public product: Product;

  @ManyToOne(() => OrderEntity, (order) => order.orderToProducts)
  public order: OrderEntity;
}
