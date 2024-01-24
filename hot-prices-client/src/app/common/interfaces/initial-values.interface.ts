import { TreeNode } from "primeng/api";
import { Category } from "src/app/feature/post/models/category.model";
import { User } from "src/app/feature/user/models/user.model";

export interface InitialValues {
  categories?: TreeNode<Category>[] | Category[];
  stores?: string[];
  locations?: string[];
  users?: User[];
}