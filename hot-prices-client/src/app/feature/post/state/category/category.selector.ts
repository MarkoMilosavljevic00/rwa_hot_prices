import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.state';
import { TreeNode } from 'primeng/api';
import { Category } from '../../models/category.model';


export const selectOffersFeature = createFeatureSelector<CategoryState>('categories');

export const selectOfferIds = createSelector(
  selectOffersFeature,
  (offers) => offers.ids
);

export const selectCategoriesList = createSelector(selectOffersFeature, (categories) =>
  (categories.ids as Array<string | number>).reduce(
    (acc: Category[], id: number | string) => {
      const category = categories.entities[id];
      if (category != null) {
        acc.push(<Category>category);
      }
      return acc;
    },
    []
  )
);

export const selectCategoriesList1 = createSelector(selectOffersFeature, selectOfferIds, (category, categoryIds) => {
  return categoryIds.map((id) => {
    return category.entities[id];
  });
}
);



