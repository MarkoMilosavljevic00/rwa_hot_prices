import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SaleType } from '../../../common/enums/sale-type.enum';
import { SortBy, SortType } from 'src/common/enums/sort.enum';
import { PostType } from 'src/common/enums/post-type.enum';

export class FilterPostDto {
  @IsEnum(PostType)
  postType: PostType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumberString()
  categoryId?: number;

  @IsOptional()
  @IsNumberString()
  ownerId?: number;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(SortType)
  sortType?: SortType;

  @IsOptional()
  @IsNumberString()
  pageSize?: number;

  @IsOptional()
  @IsNumberString()
  pageIndex?: number;
}
