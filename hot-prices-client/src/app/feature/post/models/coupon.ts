import { Post } from './post';

export interface Coupon extends Post {
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  discount?: number;
  expiryDate?: Date;
}
