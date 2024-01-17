import { SaleType } from "src/app/common/enums/sale-type.enum";

export class UpdateOfferDto {
  title?: string;
  categoryId?: number;
  imgPaths?: string[];
  saleType?: SaleType;
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