import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { InstrumentCategories } from 'src/utils/categoryTypes.enum';
import { InstrumentBrands } from 'src/utils/brandTypes.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: number;

  @Column()
  @PrimaryGeneratedColumn('uuid')
  productId?: UUID;

  @Column({ type: 'varchar', length: 255, default: null })
  productName?: string;

  @Column({
    type: 'enum',
    enum: InstrumentCategories,
    nullable: false,
    default: null,
  })
  productCategory?: InstrumentCategories;

  @Column({
    type: 'enum',
    enum: InstrumentBrands,
    nullable: true,
    default: null,
  })
  productBrand?: InstrumentBrands;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 500, default: null })
  productDescription?: string;

  @Column({ type: 'numeric', nullable: true })
  weight?: number;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  status?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @OneToMany(() => Image, (image) => image.product)
  images?: Image[];
}
