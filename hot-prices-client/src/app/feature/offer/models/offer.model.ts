
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Post } from '../../post/models/post.model';

export interface Offer extends Post {
  imgPaths: string[];
  type: SaleType;
  description: string;
  store?: string;
  link?: string;
  location?: string;
  specifications?: Record<string, string>;
  oldPrice?: number;
  price: number;
  expiryDate: Date;
}
