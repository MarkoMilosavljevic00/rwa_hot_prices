import { Allow, IsArray, IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { SaleType } from "../../common/enums/sale-type.enum";
import { Category } from "../entities/category.entity";

export class FormOfferDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  // @ValidateNested()
  // @Type(() => Category)
  category?: Category;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imgPaths?: string[];

  @IsOptional()
  @IsEnum(SaleType)
  saleType?: SaleType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsObject()
  specifications?: Record<string, string>;

  @IsOptional()
  @IsDateString()
  expiryDate?: Date;
}