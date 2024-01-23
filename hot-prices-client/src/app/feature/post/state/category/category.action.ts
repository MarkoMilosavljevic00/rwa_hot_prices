import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';
import { TreeNode } from 'primeng/api';

export const loadCategories = createAction('[Category] Load categories');
export const loadCategoriesSuccess = createAction(
  '[Category] Load categories success',
  props<{ categories: Category[] }>()
);
