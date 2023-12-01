import { ReactionType } from '../enums/reaction-type.enum';
import { Post } from './post';
import { User } from './user';

export interface Reaction {
  id: number;
  type: ReactionType;
  user: User;
  post: Post;
}
