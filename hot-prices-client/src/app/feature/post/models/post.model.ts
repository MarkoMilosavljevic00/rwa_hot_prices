import { PostStatus } from "src/app/common/enums/post-status.enum";
import { Reaction } from "./reaction";
import { Report } from "./report";
import { Category } from "./category";


export interface Post {
  id: number;
  title: string;
  numOfHotReactions: number;
  numOfColdReactions: number;
  postedDate: Date;
  status: PostStatus;
  owner: string;
  category: Category;
  reactions: Reaction[];
  comments: Comment[];
  reports: Report[];
}
