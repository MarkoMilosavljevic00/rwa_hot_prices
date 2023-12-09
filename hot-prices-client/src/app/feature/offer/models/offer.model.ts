
import { OfferType } from 'src/app/common/enums/offer-type.enum';
import { Post } from '../../post/models/post';

export interface Offer extends Post {
  type: OfferType;
  description: string;
  store?: string;
  link?: string;
  location?: string;
  specifications?: Record<string, string>;
  oldPrice?: number;
  price: number;
  expiryDate: Date;
}
