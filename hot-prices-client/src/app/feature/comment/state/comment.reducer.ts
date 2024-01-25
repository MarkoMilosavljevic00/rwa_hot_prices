import { createReducer, on } from '@ngrx/store';
import * as Actions from './comment.action';
import { Comment } from '../models/comment.model';
import { CommentState } from './comment.state';
import { createEntityAdapter } from '@ngrx/entity';

const adapter = createEntityAdapter<Comment>();

export const initialState: CommentState = adapter.getInitialState();

export const commentReducer = createReducer(
  initialState,
  on(Actions.loadCommentsByPostIdSuccess, (state, { comments }) => {
    return adapter.setAll(comments, state)
  }),
  on(Actions.postCommentSuccess, (state, { comment }) => {
    return adapter.addOne(comment, state)
  }),
  on(Actions.deleteCommentSuccess, (state, { commentId }) => {
    return adapter.removeOne(commentId, state)
  })
);
