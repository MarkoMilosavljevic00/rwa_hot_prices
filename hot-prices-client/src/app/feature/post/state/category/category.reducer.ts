import { createReducer, on } from '@ngrx/store';
import * as Actions from './category.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CategoryState } from './category.state';
import { TreeNode } from 'primeng/api';
import { Category } from '../../models/category.model';

const adapter = createEntityAdapter<Category>();

export const initialState: CategoryState = adapter.getInitialState();

export const categoryReducer = createReducer(
  initialState,
  on(Actions.loadCategoriesSuccess, (state, { categories }) => {
    return adapter.setAll(categories, state)
  }),
);
