import { Allow, IsArray, IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { SaleType } from "../../../common/enums/sale-type.enum";
import { FormPostDto } from "src/modules/post/dtos/form-post.dto";

export class FormCouponDto extends FormPostDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imgPaths?: string[];

  @IsEnum(SaleType)
  saleType: SaleType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  discounts?: Record<string, number>;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: Date;
}