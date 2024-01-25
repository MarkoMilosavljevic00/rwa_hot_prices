import { IsNumber, IsNumberString, IsString } from "class-validator";

export class PostCommentDto {
  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  postId: number;
}