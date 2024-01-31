import { PostType } from "src/app/common/enums/post-type.enum";
import { SortBy, SortType } from "src/app/common/enums/sort.enum";

export class FilterConversationDto {
  title?: string;
  categoryId?: number;
  ownerId?: number;
  sortBy?: SortBy;
  sortType?: SortType;
  pageSize?: number;
  pageIndex?: number;
}
