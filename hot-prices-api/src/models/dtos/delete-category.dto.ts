import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { ChildHandlingMethod } from "../../common/enums/child-handling-method.enum";

export class DeleteCategoryDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEnum(ChildHandlingMethod)
  childHandlingMethod: ChildHandlingMethod;
}
