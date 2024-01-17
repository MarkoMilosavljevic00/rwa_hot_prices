import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Category } from "../entities/category.entity";
import { Type } from "class-transformer";

export class CreateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imgPaths?: string[];

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Category)
  parent?: Category;
}