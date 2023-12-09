import { Post } from "../../post/models/post";

export interface Coupon extends Post {
  description: string;
  isOnline: boolean;
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  discount?: number;
  expiryDate?: Date;
}
