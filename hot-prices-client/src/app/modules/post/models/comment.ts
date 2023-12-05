import { Post } from "./post";
import { User } from "../../user/models/user.model";

export interface Comment {
  id: number;
  content: string;
  imgPaths: string[];
  post: Post;
  owner: User;
}
