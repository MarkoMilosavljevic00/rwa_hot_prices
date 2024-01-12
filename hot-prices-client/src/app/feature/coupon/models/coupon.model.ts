import { SaleType } from "src/app/common/enums/sale-type.enum";
import { Post } from "../../post/models/post.model";

export interface Coupon extends Post {
  imgPaths: string[];
  saleType: SaleType;
  description: string;
  // discount: number;
  discounts: Record<string, number>;
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  expiryDate?: Date;
}
