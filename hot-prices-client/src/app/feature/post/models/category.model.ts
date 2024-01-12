import { Post } from "./post.model";

export interface Category {
  id: number;
  name: string;
  description?: string;
  imgPaths: string[];
  children?: Category[];
  parent?: Category;
  posts?: Post[];
}