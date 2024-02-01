import { PostType } from "src/app/common/enums/post-type.enum";
import { SaleType } from "src/app/common/enums/sale-type.enum";
import { SortBy, SortType } from "src/app/common/enums/sort.enum";


export class FilterCouponDto {
  title?: string;
  categoryId?: number;
  ownerId?: number;
  saleType?: SaleType;
  store?: string;
  location?: string;
  minDiscount?: number;
  maxDiscount?: number;
  expired?: boolean;
  sortBy?: SortBy;
  sortType?: SortType;
  pageSize?: number;
  pageIndex?: number;
}
