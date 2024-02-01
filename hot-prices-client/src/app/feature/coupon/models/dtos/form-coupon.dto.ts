import { PostType } from 'src/app/common/enums/post-type.enum';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Category } from 'src/app/feature/post/models/category.model';

export class FormCouponDto {
  postType: PostType;
  title: string;
  categoryId: number;
  imgPaths?: string[];
  saleType: SaleType;
  description?: string;
  discounts?: Record<string, number>;
  maxDiscount: number;
  store?: string;
  location?: string;
  link?: string;
  code?: string;
  expiryDate?: Date;
}
