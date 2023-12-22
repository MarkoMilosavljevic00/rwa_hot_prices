import { SaleType } from "src/app/common/enums/sale-type.enum";
import { Category } from "../../post/models/category";



export interface OfferDto{
  title?: string;
  category?: Category;
  imgPaths?: string[];
  type?: SaleType;
  description?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  store?: string;
  link?: string;
  location?: string;
  specifications?: Record<string, string>;
  expiryDate?: Date;
}
