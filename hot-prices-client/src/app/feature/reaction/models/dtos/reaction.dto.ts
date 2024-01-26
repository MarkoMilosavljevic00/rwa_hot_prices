import { ReactionType } from "src/app/common/enums/reaction-type.enum";

export interface ReactionDto {
  userId: number;
  postId: number;
  type?: ReactionType;
}