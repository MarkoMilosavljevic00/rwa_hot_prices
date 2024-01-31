import { TreeNode } from 'primeng/api';
import { FilterOfferDto } from 'src/app/feature/offer/models/dtos/filter-offer.dto';
import { Category } from 'src/app/feature/post/models/category.model';
import { User } from 'src/app/feature/user/models/user.model';
import { FilterConversationDto } from './dtos/filter-conversation.dto';

export class FilterConversation extends FilterConversationDto {
  selectedCategory?: Category;
  selectedUser?: User;
}
