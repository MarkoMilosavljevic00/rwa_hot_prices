import { Entity, Column, ManyToOne, ChildEntity } from 'typeorm';
import { OfferType } from '../enums/offer-type.enum';
import { Post } from './post.entity';

@ChildEntity()
export class Coupon extends Post {
  @Column({ nullable: true })
  store: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true, type: 'double precision' })
  discount: number;

  @Column({
    type: 'timestamptz',
    nullable: true
  })
  expiryDate: Date;
}