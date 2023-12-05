
import { OfferType } from 'src/app/common/enums/offer-type.enum';
import { Post } from './post';

export interface Offer extends Post {
  type: OfferType;
  store?: string;
  link?: string;
  specifications?: Record<string, string>;
  oldPrice?: number;
  price: number;
  expiryDate: Date;
}
