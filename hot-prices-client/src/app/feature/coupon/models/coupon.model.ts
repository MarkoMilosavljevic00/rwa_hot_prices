import { SaleType } from "src/app/common/enums/sale-type.enum";
import { Post } from "../../post/models/post.model";
import { PostType } from "src/app/common/enums/post-type.enum";

export interface Coupon extends Post {
  imgPaths: string[];
  saleType: SaleType;
  description: string;
  discounts: Record<string, number>;
  maxDiscount: number;
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  expiryDate?: Date;
}
