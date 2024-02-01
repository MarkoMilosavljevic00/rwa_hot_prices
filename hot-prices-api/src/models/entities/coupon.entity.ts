import { Entity, Column, ManyToOne, ChildEntity } from 'typeorm';
import { SaleType } from '../../common/enums/sale-type.enum';
import { Post } from './post.entity';

@ChildEntity()
export class Coupon extends Post {
  @Column('varchar', { array: true })
  imgPaths: string[];

  @Column({type: 'enum', enum: SaleType})
  saleType: SaleType;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'jsonb' })
  discounts: Record<string, number>;

  @Column({ nullable: false, default: 0})
  maxDiscount: number;
  
  @Column({ nullable: true })
  store: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  code: string;

  @Column({
    type: 'timestamptz',
    nullable: true
  })
  expiryDate: Date;
}