import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  username?: string;
  
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  currentPassword?: string;

  @IsOptional()
  @IsString()
  newPassword?: string;
}