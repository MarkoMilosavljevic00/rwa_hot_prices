import { Category } from "src/models/entities/category.entity";
import { User } from "src/models/entities/user.entity";


export interface InitialValues {
  categories?: Category[];
  stores?: string[];
  locations?: string[];
  users?: User[];
}