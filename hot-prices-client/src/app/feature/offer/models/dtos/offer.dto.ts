import { SaleType } from "src/app/common/enums/sale-type.enum";
import { Category } from "../../../post/models/category.model";



export interface OfferDto{
  title?: string;
  description?: string;
  category?: Category;
  imgPaths?: string[];
  saleType?: SaleType;
  price?: number;
  oldPrice?: number;
  discount?: number;
  store?: string;
  link?: string;
  location?: string;
  specifications?: Record<string, string>;
  expiryDate?: Date;
}
