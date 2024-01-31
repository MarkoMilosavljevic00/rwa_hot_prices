import { Allow, IsArray, IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { SaleType } from "../../../common/enums/sale-type.enum";
import { Category } from "../../../models/entities/category.entity";
import { PostType } from "src/common/enums/post-type.enum";

export class FormPostDto {
  // @IsOptional()
  @IsString()
  title: string;

  // @IsNumber()
  // ownerId: number;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  // @ValidateNested()
  // @Type(() => Category)
  category?: Category;

  @IsEnum(PostType)
  postType: PostType;
}