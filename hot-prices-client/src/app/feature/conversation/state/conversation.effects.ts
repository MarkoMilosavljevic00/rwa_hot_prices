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
import { PAGE } from 'src/app/common/constants';
import { CommentService } from '../../comment/services/comment.service';
import { ConversationService } from '../services/conversation.service';
import { FilterConversationDto } from '../models/dtos/filter-conversation.dto';

@Injectable()
export class ConversationEffects {
  postConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.createConversation),
      switchMap(({ formConversationDto }) =>
        this.conversationService.postOffer(formConversationDto).pipe(
          concatMap((conversation) => {
            return [
              ConversationActions.submittedConversationSuccess({
                conversation,
              }),
              ConversationActions.loadConversations({
                filterConversationDto: {
                  pageIndex: PAGE.INITIAL_INDEX,
                  pageSize: PAGE.SIZE,
                },
              }),
            ];
          }),
          catchError(() => of())
        )
      )
    )
  );

  // updateffer$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(OfferActions.updateOffer),
  //     switchMap(({ offerId, formOfferDto }) =>
  //       this.offerService.updateOffer(offerId, formOfferDto).pipe(
  //         concatMap((offer) => {
  //           return [
  //             OfferActions.submittedOfferSuccess({ offer }),
  //             OfferActions.loadOffers({
  //               filterOfferDto: {
  //                 pageIndex: PAGE.INITIAL_INDEX,
  //                 pageSize: PAGE.SIZE,
  //               },
  //             }),
  //           ];
  //         }),
  //         catchError(() => of())
  //       )
  //     )
  //   )
  // );

  loadConversation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.loadConversations),
      switchMap(({ filterConversationDto: filterConversation }) => {
        const filterConversationDto: FilterConversationDto = filterConversation;
        return this.conversationService
          .getConversationByFilter(filterConversationDto)
          .pipe(
            tap(({ posts }) => console.log(posts)),
            map(({ posts, length }) => {
              console.log(posts);
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

    loadDetailedOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(ConversationActions.loadDetailedConversation),
      switchMap(({ offerId }) =>
        this.conversationService.getConversationById(offerId).pipe(
          map((offer) => {
            console.log(offer);
            return OfferActions.loadDetailedOfferSuccess({ offer })
          }),
          catchError(() => of(OfferActions.loadDetailedOfferFailure()))
        )
      )
    )
  );

  // loadAvailableTitles$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(OfferActions.changeFilter, OfferActions.loadTitles),
  //     switchMap(({ filterOffer: filter }) => {
  //       const {
  //         isDiscountEnabled,
  //         isPricingEnabled,
  //         selectedCategory,
  //         selectedUser,
  //         ...filterOfferDto
  //       } = filter;
  //       console.log(filterOfferDto);
  //       return this.offerService
  //         .getOfferDistinctPropertyByFilter('title', filterOfferDto)
  //         .pipe(
  //           map((titles) => OfferActions.loadTitlesSuccess({ titles })),
  //           catchError(() => of())
  //         );
  //     })
  //   )
  // );

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

  // loadEditingOffer$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(OfferActions.loadEditingOffer),
  //     switchMap(({ offerId }) =>
  //       this.offerService.getOfferById(offerId).pipe(
  //         map((offer) => OfferActions.loadEditingOfferSuccess({ offer })),
  //         catchError(() => of())
  //       )
  //     )
  //   )
  // );

  // navigateToOffer$ = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(OfferActions.submittedOfferSuccess),
  //       tap(({ offer }) => {
  //         this.router.navigate(['/posts/details/offer/' + offer.id]);
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Successly Submitted Offer',
  //           detail: 'You have successfully submitted your offer.',
  //         });
  //       })
  //     ),
  //   { dispatch: false }
  // );

  constructor(
    private action$: Actions,
    private conversationService: ConversationService,
    private commentService: CommentService,
    private messageService: MessageService,
    private router: Router
  ) {}
}
