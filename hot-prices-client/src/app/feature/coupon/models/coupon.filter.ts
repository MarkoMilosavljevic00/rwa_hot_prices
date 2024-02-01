import { Category } from 'src/app/feature/post/models/category.model';
import { User } from 'src/app/feature/user/models/user.model';
import { FilterCouponDto } from './dtos/filter-coupon.dto';

export class FilterCoupon extends FilterCouponDto {
  isPricingEnabled?: boolean = false;
  isDiscountEnabled?: boolean = false;
  selectedCategory?: Category;
  selectedUser?: User;
}
