import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  EMPTY,
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import * as ConversationActions from './conversation.action';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { KEYS, PAGE } from 'src/app/common/constants';
import { CommentService } from '../../comment/services/comment.service';
import { ConversationService } from '../services/conversation.service';
import { FilterConversationDto } from '../models/dtos/filter-conversation.dto';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationSeverity } from 'src/app/common/enums/message.enum';

@Injectable()
export class ConversationEffects {
  createConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.createConversation),
      switchMap(({ formConversationDto }) =>
        this.conversationService.createConversation(formConversationDto).pipe(
          concatMap((conversation) => {
            return [
              ConversationActions.createConversationSuccess({
                conversation,
              }),
              // ConversationActions.loadConversations({
              //   filterConversationDto: {
              //     pageIndex: PAGE.INITIAL_INDEX,
              //     pageSize: PAGE.SIZE,
              //   },
              // }),
            ];
          }),
          catchError(({ error }) =>
            of(ConversationActions.createConversationFailure(error))
          )
        )
      )
    )
  );

  updateConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.updateConversation),
      switchMap(({ id, formConversationDto }) =>
        this.conversationService
          .updateConversation(id, formConversationDto)
          .pipe(
            concatMap((conversation) => {
              return [
                ConversationActions.updateConversationSuccess({ conversation }),
                // OfferActions.loadOffers({
                //   filterOfferDto: {
                //     pageIndex: PAGE.INITIAL_INDEX,
                //     pageSize: PAGE.SIZE,
                //   },
                // }),
              ];
            }),
            catchError((error) =>
              of(ConversationActions.updateConversationFailure({ error }))
            )
          )
      )
    )
  );

  submittedConversationSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          ConversationActions.createConversationSuccess,
          ConversationActions.updateConversationSuccess
        ),
        tap(({ conversation }) => {
          this.router.navigate([
            '/posts/details/conversation/' + conversation.id,
          ]);
          this.notificationService.showMessage(
            NotificationSeverity.SUCCESS,
            'Success',
            'Conversation saved successfully'
          );
        })
      ),
    { dispatch: false }
  );

  submittedConversationFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          ConversationActions.createConversationFailure,
          ConversationActions.updateConversationFailure,
          ConversationActions.deleteConversationFailure
        ),
        tap(({ error }) => {
          this.notificationService.showMessage(
            NotificationSeverity.ERROR,
            'Error',
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  deleteConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.deleteConversation),
      switchMap(({ id }) =>
        this.conversationService.deleteConversation(id).pipe(
          map(() => ConversationActions.deleteConversationSuccess()),
          catchError((error) =>
            of(ConversationActions.deleteConversationFailure({ error }))
          )
        )
      )
    )
  );

  deleteConversationSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ConversationActions.deleteConversationSuccess),
        tap(() => {
          this.router.navigate(['/posts/conversations']);
          this.notificationService.showMessage(
            NotificationSeverity.SUCCESS,
            'Success',
            'Conversation deleted successfully'
          );
        })
      ),
    { dispatch: false }
  );

  loadConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.loadConversations),
      switchMap(({ filterConversationDto: filterConversation }) => {
        const filterConversationDto: FilterConversationDto = filterConversation;
        return this.conversationService
          .getConversationsByFilter(filterConversationDto)
          .pipe(
            tap(({ posts }) => console.log('CONVERSATIONS Loading...')),
            map(({ posts, length }) => {
              return ConversationActions.loadConversationsSuccess({
                conversations: posts,
                length,
              });
            }),
            catchError((error) =>
              of(ConversationActions.loadConversationsFailure({ error }))
            )
          );
      })
    )
  );

  loadDetailedConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.loadDetailedConversation),
      switchMap(({ id }) =>
        this.conversationService.getConversationById(id).pipe(
          map((conversation) =>
            ConversationActions.loadDetailedConversationSuccess({
              conversation: conversation,
            })
          ),
          catchError((error) =>
            of(ConversationActions.loadDetailedConversationFailure({ error }))
          )
        )
      )
    )
  );

  loadEditingConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.loadEditingConversation),
      switchMap(({ id }) =>
        this.conversationService.getConversationById(id).pipe(
          map((conversation) =>
            ConversationActions.loadEditingConversationSuccess({ conversation })
          ),
          catchError((error) =>
            of(ConversationActions.loadEditingConversationFailure({ error }))
          )
        )
      )
    )
  );

  loadConversationFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          ConversationActions.loadDetailedConversationFailure,
          ConversationActions.loadEditingConversationFailure
        ),
        tap(({ error }) => {
          this.router.navigate(['/posts/conversations']);
          this.notificationService.showMessage(
            NotificationSeverity.ERROR,
            'Error',
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  // changeConversationFilter$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(ConversationActions.changeConversationFilter),
  //     switchMap(({ filterConversation }) => {
  //       const { selectedCategory, selectedUser, ...filterConversationDto } =
  //         filterConversation;
  //       return this.conversationService
  //         .getConversationsByFilter(filterConversationDto)
  //         .pipe(
  //           map(({ posts, length }) =>
  //             ConversationActions.loadConversationsSuccess({
  //               conversations: posts,
  //               length,
  //             })
  //           ),
  //           catchError((error) =>
  //             of(ConversationActions.loadConversationsFailure({ error }))
  //           )
  //         );
  //     })
  //   )
  // );

  loadAvailableTitles$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        ConversationActions.changeConversationFilter,
        ConversationActions.loadConversationTitles
      ),
      switchMap(({ filterConversation: filter }) => {
        const { selectedCategory, selectedUser, ...filterOfferDto } = filter;
        return this.conversationService
          .getConversationsDistinctPropertyByFilter(KEYS.TITLE, filterOfferDto)
          .pipe(
            map((titles) =>
              ConversationActions.loadConversationTitlesSuccess({ titles })
            ),
            catchError(() => of())
          );
      })
    )
  );

  // // loadAllCommentsFromOffer$ = createEffect(() =>
  // //   this.action$.pipe(
  // //     ofType(OfferActions.loadAllCommentsFromOffer),
  // //     switchMap(({ offerId }) => {
  // //       return this.commentService.getAllCommentsByPostId(offerId).pipe(
  // //         map((comments) =>
  // //           OfferActions.loadAllCommentsFromOfferSuccess({ comments })
  // //         ),
  // //         catchError(() => of())
  // //       );
  // //     })
  // //   )
  // // );

  constructor(
    private action$: Actions,
    private conversationService: ConversationService,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private router: Router
  ) {}
}
