import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class GetCategoryDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsBoolean()
  descendants?: boolean;
  
  @IsOptional()
  @IsBoolean()
  ancestors?: boolean;
}
