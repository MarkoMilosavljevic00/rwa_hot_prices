import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { SaleType } from "../enums/sale-type.enum";
import { Category } from "../entities/category.entity";

export class OfferCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imgPaths: string[];

  @IsEnum(SaleType)
  saleType: SaleType;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsString()
  store: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsObject()
  specifications: Record<string, string>;

  @IsOptional()
  @IsDateString()
  expiryDate: Date;
}