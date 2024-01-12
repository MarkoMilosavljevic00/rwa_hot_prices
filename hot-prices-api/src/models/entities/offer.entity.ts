import { Entity, Column, ManyToOne, ChildEntity } from 'typeorm';
import { SaleType } from '../enums/sale-type.enum';
import { Post } from './post.entity';
import { User } from './user.entity';

@ChildEntity()
export class Offer extends Post {
  @Column('varchar', { array: true })
  imgPaths: string[];

  @Column({type: 'enum', enum: SaleType})
  saleType: SaleType;

  @Column()
  description: string;

  @Column({ nullable: false, type: 'double precision' })
  price: number;

  @Column({ nullable: true, type: 'double precision' })
  oldPrice: number;

  @Column({ nullable: true, type: 'double precision' })
  discount: number;

  @Column({ nullable: true })
  store: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true, type: 'jsonb' })
  specifications: Record<string, string>;

  @Column({
    type: 'timestamptz',
    nullable: true
  })
  expiryDate: Date;
}