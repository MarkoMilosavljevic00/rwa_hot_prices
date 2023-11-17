import { Entity, Column, ManyToOne, ChildEntity } from 'typeorm';
import { OfferType } from '../enums/offer-type.enum';
import { Post } from './post.entity';
import { User } from './user.entity';

@ChildEntity()
export class Offer extends Post {
  @Column({type: 'enum', enum: OfferType})
  type: OfferType;

  @Column({ nullable: true })
  store: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true, type: 'jsonb' })
  specifications: Record<string, string>;

  @Column({ nullable: true, type: 'double precision' })
  oldPrice: number;

  @Column({ nullable: false, type: 'double precision' })
  price: number;

  @Column({
    type: 'timestamptz',
    nullable: false
  })
  expiryDate: Date;
}