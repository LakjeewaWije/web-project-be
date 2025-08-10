import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderToProductEntity } from './order-to-product.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  orderId?: UUID;

  @Column({ type: 'numeric', nullable: true })
  total?: number;

  @Index()
  @Column({ type: 'varchar', length: 255, default: null })
  recipientFirstName: string;

  @Index()
  @Column({ type: 'varchar', length: 255, default: null })
  recipientLastName: string;

  @Index()
  @Column({ type: 'varchar', length: 15 })
  recipientMobilePhone: string;

  @Index()
  @Column({ type: 'varchar', default: null })
  recipientEircode: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(
    () => OrderToProductEntity,
    (OrderToProductEntity) => OrderToProductEntity.order,
  )
  public orderToProducts?: OrderToProductEntity[];
}
