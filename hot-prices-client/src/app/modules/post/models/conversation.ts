import { Post } from "./post";


export interface Conversation extends Post {
  content: string;
}
