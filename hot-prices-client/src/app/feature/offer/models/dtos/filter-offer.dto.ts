import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { SortBy, SortType } from 'src/app/common/enums/sort.enum';

export class FilterOfferDto {
  title?: string;
  categoryId?: number;
  ownerId?: number;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
  saleType?: SaleType;
  store?: string;
  location?: string;
  expired?: boolean;
  sortBy?: SortBy;
  sortType?: SortType;
  pageSize?: number;
  pageIndex?: number;
}
