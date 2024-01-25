import { createAction, props } from '@ngrx/store';
import { Comment } from '../models/comment.model';
import { PostCommentDto } from '../models/dtos/post-comment.dto';

export const loadNumOfCommentsByPostId = createAction(
  '[Comment] Load num of Comments by Offer Id',
  props<{ postId: number; numOfComments: number }>()
);

export const loadAllCommentsByPostId = createAction(
  '[Comment] Load all Comments by Offer Id',
  props<{ postId: number }>()
);

export const loadCommentsByPostIdSuccess = createAction(
  '[Comment] Load Comments by Offer Id success',
  props<{ comments: Comment[] }>()
);

export const postComment = createAction(
  '[Comment] Post Comment',
  props<{ postCommentDto: PostCommentDto }>()
);

export const postCommentSuccess = createAction(
  '[Comment] Post Comment success',
  props<{ comment: Comment }>()
);

export const deleteComment = createAction(
  '[Comment] Delete Comment',
  props<{ commentId: number }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment success',
  props<{ commentId: number }>()
);
