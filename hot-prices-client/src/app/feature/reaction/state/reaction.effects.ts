import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as ReactionActions from './reaction.action';
import { ReactionService } from '../services/reaction.service';

@Injectable()
export class ReactionEffects {
  loadReaction$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReactionActions.loadReaction),
      mergeMap(({ userId, postId }) => {
        return this.reactionService
          .getReactionByUserAndPostId(userId, postId)
          .pipe(
            map((reactionResponse) => {
              console.log(reactionResponse);
              return ReactionActions.loadReactionSuccess({
                ...reactionResponse,
              });
            }),
            catchError(() => of({ type: 'load error' }))
          );
      })
    )
  );

  // loadAllCommentsById$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(ReactionActions.loadAllCommentsByPostId),
  //     mergeMap(({ postId }) =>
  //       this.reactionService.getAllCommentsByPostId(postId).pipe(
  //         map((comments) => {
  //           return ReactionActions.loadCommentsByPostIdSuccess({
  //             comments,
  //           });
  //         }),
  //         catchError(() => of({ type: 'load error' }))
  //       )
  //     )
  //   )
  // );

  postOrUpdateReaction$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReactionActions.postOrUpdateReaction),
      mergeMap(({ reaction }) => {
        return this.reactionService.postOrUpdateReaction(reaction).pipe(
          map((reactionResponse) => {
            return ReactionActions.loadReactionSuccess({
              ...reactionResponse,
            });
          }),
          catchError(() => of({ type: 'load error' }))
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private reactionService: ReactionService
  ) {}
}
