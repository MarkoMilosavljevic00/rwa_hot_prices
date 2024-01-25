import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from './comment.state';
import { Comment } from '../models/comment.model';


export const selectCommentsFeature = createFeatureSelector<CommentState>('comments');

export const selectCommentsIds = createSelector(
  selectCommentsFeature,
  (offers) => offers.ids
);

export const selectCommentsList = createSelector(selectCommentsFeature, (categories) =>
  (categories.ids as Array<string | number>).reduce(
    (acc: Comment[], id: number | string) => {
      const category = categories.entities[id];
      if (category != null) {
        acc.push(<Comment>category);
      }
      return acc;
    },
    []
  )
);

export const selectCommentsList1 = createSelector(selectCommentsFeature, selectCommentsIds, (category, categoryIds) => {
  return categoryIds.map((id) => {
    return category.entities[id];
  });
}
);



