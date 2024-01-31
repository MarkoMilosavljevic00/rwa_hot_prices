import { SaleType } from 'src/app/common/enums/sale-type.enum';

export class FormOfferDto {
  title: string;
  categoryId: number;
  // ownerId: number;
  imgPaths?: string[];
  saleType: SaleType;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  store?: string;
  link?: string;
  location?: string;
  specifications?: Record<string, string>;
  expiryDate?: Date | null;
}
