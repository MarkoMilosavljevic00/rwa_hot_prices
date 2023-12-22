import { SaleType } from "src/app/common/enums/sale-type.enum";
import { Category } from "../../post/models/category";



export interface CouponDto{
  title?: string;
  category?: Category;
  description?: string;
  imgPaths?: string[];
  saleType?: SaleType;
  discounts?: Record<string, number>;
  discount?: number;
  store?: string;
  code?: string;
  link?: string;
  location?: string;
  expiryDate?: Date;
}