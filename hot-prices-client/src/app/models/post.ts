import { PostStatus } from '../enums/post-status.enum';
import { Category } from './category';
import { Comment } from './comment';
import { Reaction } from './reaction';
import { Report } from './report';
import { User } from './user';

export interface Post {
  id: number;
  title: string;
  imgPaths: string[];
  numOfHotReactions: number;
  numOfColdReactions: number;
  postedDate: Date;
  status: PostStatus;
  owner: User;
  category: Category;
  reactions: Reaction[];
  comments: Comment[];
  reports: Report[];
}
