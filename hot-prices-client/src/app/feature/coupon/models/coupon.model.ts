import { SaleType } from "src/app/common/enums/sale-type.enum";
import { Post } from "../../post/models/post.model";

export interface Coupon extends Post {
  description: string;
  imgPaths: string[];
  isOnline: boolean;
  saleType: SaleType;
  discounts?: Record<string, string>;
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  discount?: number;
  expiryDate?: Date;
}
