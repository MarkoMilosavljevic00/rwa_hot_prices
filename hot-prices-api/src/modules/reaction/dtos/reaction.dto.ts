import { IsEnum, IsNumber, IsNumberString } from "class-validator";
import { ReactionType } from "src/common/enums/reaction-type.enum";


export class ReactionDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  postId: number;
  @IsEnum(ReactionType)
  type: ReactionType;
}