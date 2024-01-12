import { PostStatus } from "src/app/common/enums/post-status.enum";
import { Category } from "./category.model";
import { Reaction } from "./reaction.model";
import { Report } from "./report.model";
import { User } from "../../user/models/user.model";

export interface Post {
  id: number;
  title: string;
  numOfHotReactions: number;
  numOfColdReactions: number;
  postedDate: Date;
  status: PostStatus;
  owner: string;
  category: Category;
  restricted: boolean;
  reactions: Reaction[];
  comments: Comment[];
  reports: Report[];
}

export interface PostTest {
  id: number;
  title: string;
  numOfHotReactions: number;
  numOfColdReactions: number;
  postedDate: Date;
  // status: PostStatus;
  restricted: boolean;
  owner: User;
  category: Category;
  reactions: Reaction[];
  comments: Comment[];
  reports: Report[];
}
