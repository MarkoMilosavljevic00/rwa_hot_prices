import { Post } from "../../post/models/post.model";


export interface Conversation extends Post {
  content: string;
}
