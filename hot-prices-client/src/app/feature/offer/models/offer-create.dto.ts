import { Category } from '../../post/models/category.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';

export class OfferCreateDto {
  title?: string;
  categoryId?: number;
  // category?: Category;
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
