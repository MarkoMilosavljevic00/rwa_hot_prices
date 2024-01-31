import { TreeNode } from 'primeng/api';
import { FilterOfferDto } from 'src/app/feature/offer/models/dtos/filter-offer.dto';
import { Category } from 'src/app/feature/post/models/category.model';
import { User } from 'src/app/feature/user/models/user.model';

export class FilterOffer extends FilterOfferDto {
  isPricingEnabled?: boolean = false;
  isDiscountEnabled?: boolean = false;
  selectedCategory?: Category;
  selectedUser?: User;
}
