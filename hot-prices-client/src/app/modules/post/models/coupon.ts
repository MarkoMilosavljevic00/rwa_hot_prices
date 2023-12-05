import { Post } from './post';

export interface Coupon extends Post {
  store?: string;
  code?: string;
  link?: string;
  discount?: number;
  expiryDate?: Date;
}
