import { Post } from "./post.model";
import { User } from "../../user/models/user.model";

export interface Comment {
  id: number;
  content: string;
  postedDate: Date;
  post?: Post;
  owner: string;
}
