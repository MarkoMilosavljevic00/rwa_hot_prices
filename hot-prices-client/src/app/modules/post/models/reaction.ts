import { ReactionType } from "src/app/common/enums/reaction-type.enum";
import { User } from "../../user/models/user.model";
import { Post } from "./post";


export interface Reaction {
  id: number;
  type: ReactionType;
  user: User;
  post: Post;
}
