import { Post } from "../../post/models/post.model";

export interface Coupon extends Post {
  description: string;
  imgPaths: string[];
  isOnline: boolean;
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  discount?: number;
  expiryDate?: Date;
}
