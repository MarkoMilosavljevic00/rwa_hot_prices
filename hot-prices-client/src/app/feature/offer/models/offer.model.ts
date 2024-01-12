
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Post } from '../../post/models/post.model';

export interface Offer extends Post {
  imgPaths: string[];
  saleType: SaleType;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  store?: string;
  link?: string;
  location?: string;
  specifications?: Record<string, string>;
  expiryDate?: Date;
}
