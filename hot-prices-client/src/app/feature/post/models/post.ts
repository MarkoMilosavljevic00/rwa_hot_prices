import { PostStatus } from "src/app/common/enums/post-status.enum";
import { Reaction } from "./reaction";
import { Report } from "./report";


export interface Post {
  id: number;
  title: string;
  imgPaths: string[];
  numOfHotReactions: number;
  numOfColdReactions: number;
  postedDate: Date;
  status: PostStatus;
  owner: string;
  category: string;
  reactions: Reaction[];
  comments: Comment[];
  reports: Report[];
}
