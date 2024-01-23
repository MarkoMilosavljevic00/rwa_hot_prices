import { EntityState } from "@ngrx/entity";
import { FormGroup } from "@angular/forms";
import { Category } from "../../models/category.model";
import { TreeNode } from "primeng/api";

export interface CategoryState extends EntityState<Category> {
}