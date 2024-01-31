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
import { FilterPostDto } from 'src/modules/post/dtos/filter-post.dto';

export class FilterCouponDto extends FilterPostDto {
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
}
