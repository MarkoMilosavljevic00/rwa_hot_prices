import { Post } from "../../post/models/post.model";
import { User } from "../../user/models/user.model";

export interface Comment {
  id: number;
  content: string;
  postedDate: Date;
  restricted: boolean;
  post: Post;
  owner: User;
  reports: Report[];
}

// export interface CommentTest {
//   id: number;
//   content: string;
//   postedDate: Date;
//   post?: Post;
//   owner: string;
// }
