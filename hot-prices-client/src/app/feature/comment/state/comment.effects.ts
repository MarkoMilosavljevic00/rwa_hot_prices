import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as CommentActions from './comment.action';
import { CommentService } from '../services/comment.service';

@Injectable()
export class CommentEffects {
  loadNumOfCommentsById$ = createEffect(() =>
    this.action$.pipe(
      ofType(CommentActions.loadNumOfCommentsByPostId),
      mergeMap(({ numOfComments, postId }) => {
        return this.commentService
          .getNumOfCommentsByPostId(postId, numOfComments)
          .pipe(
            map((comments) => {
              console.log(comments);
              return CommentActions.loadCommentsByPostIdSuccess({
                comments,
              });
            }),
            catchError(() => of({ type: 'load error' }))
          );
      })
    )
  );

  loadAllCommentsById$ = createEffect(() =>
    this.action$.pipe(
      ofType(CommentActions.loadAllCommentsByPostId),
      mergeMap(({ postId }) =>
        this.commentService.getAllCommentsByPostId(postId).pipe(
          map((comments) => {
            return CommentActions.loadCommentsByPostIdSuccess({
              comments,
            });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  postComment$ = createEffect(() =>
    this.action$.pipe(
      ofType(CommentActions.postComment),
      mergeMap(({ postCommentDto }) => {
        return this.commentService.postComment(postCommentDto).pipe(
          map((comment) => {
            return CommentActions.postCommentSuccess({
              comment,
            });
          }),
          catchError(() => of({ type: 'load error' }))
        );
      })
    )
  );

  deleteComment$ = createEffect(() =>
    this.action$.pipe(
      ofType(CommentActions.deleteComment),
      mergeMap(({ commentId }) => {
        return this.commentService.deleteComment(commentId).pipe(
          map(() => {
            return CommentActions.deleteCommentSuccess({ commentId });
          }),
          catchError(() => of({ type: 'load error' }))
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private commentService: CommentService
  ) {}
}
