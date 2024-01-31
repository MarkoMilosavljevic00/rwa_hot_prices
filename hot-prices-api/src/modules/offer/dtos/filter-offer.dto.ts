import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SaleType } from '../../../common/enums/sale-type.enum';
import { SortBy, SortType } from 'src/common/enums/sort.enum';
import { FilterPostDto } from 'src/modules/post/dtos/filter-post.dto';

export class FilterOfferDto extends FilterPostDto {
  // @IsOptional()
  // @IsString()
  // title?: string;

  // @IsOptional()
  // @IsNumberString()
  // categoryId?: number;

  // @IsOptional()
  // @IsNumberString()
  // ownerId?: number;

  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  maxPrice?: number;

  @IsOptional()
  @IsNumberString()
  minDiscount?: number;

  @IsOptional()
  @IsNumberString()
  maxDiscount?: number;

  @IsOptional()
  @IsEnum(SaleType)
  saleType?: SaleType;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBooleanString()
  expired?: boolean;

  // @IsOptional()
  // @IsEnum(SortBy)
  // sortBy?: SortBy;

  // @IsOptional()
  // @IsEnum(SortType)
  // sortType?: SortType;

  // @IsOptional()
  // @IsNumberString()
  // pageSize?: number;

  // @IsOptional()
  // @IsNumberString()
  // pageIndex?: number;
}
