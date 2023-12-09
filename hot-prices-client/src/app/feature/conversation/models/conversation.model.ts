import { Post } from "../../post/models/post";


export interface Conversation extends Post {
  content: string;
}
