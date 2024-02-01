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
import * as OfferActions from './offer.action';
import { OfferService } from '../services/offer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PAGE } from 'src/app/common/constants';
import { FilterOfferDto } from '../models/dtos/filter-offer.dto';
import { CommentService } from '../../comment/services/comment.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {
  NotificationSeverity,
  NotificationSummary,
} from 'src/app/common/enums/message.enum';

@Injectable()
export class OfferEffects {
  createOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.createOffer),
      switchMap(({ formOfferDto }) =>
        this.offerService.createOffer(formOfferDto).pipe(
          concatMap((offer) => {
            return [
              OfferActions.createOfferSuccess({ offer }),
              // OfferActions.submittedOfferSuccess({ offer }),
              // OfferActions.loadOffers({
              //   filterOfferDto: {
              //     pageIndex: PAGE.INITIAL_INDEX,
              //     pageSize: PAGE.SIZE,
              //   },
              // }),
            ];
          }),
          catchError((error) => of(OfferActions.createOfferFailure({ error })))
        )
      )
    )
  );

  updateffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.updateOffer),
      switchMap(({ id: offerId, formOfferDto }) =>
        this.offerService.updateOffer(offerId, formOfferDto).pipe(
          concatMap((offer) => {
            return [
              OfferActions.updateOfferSuccess({ offer }),
              // OfferActions.submittedOfferSuccess({ offer }),
              // OfferActions.loadOffers({
              //   filterOfferDto: {
              //     pageIndex: PAGE.INITIAL_INDEX,
              //     pageSize: PAGE.SIZE,
              //   },
              // }),
            ];
          }),
          catchError((error) => of(OfferActions.updateOfferFailure({ error })))
        )
      )
    )
  );

  submittedOfferSucces$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          OfferActions.createOfferSuccess,
          OfferActions.updateOfferSuccess
        ),
        tap(({ offer }) => {
          this.router.navigate(['/posts/details/offer/' + offer.id]);
          this.notificationService.showMessage(
            NotificationSeverity.SUCCESS,
            NotificationSummary.SUCCESS,
            'Offer saved successfully'
          );
        })
      ),
    { dispatch: false }
  );

  submittedOfferFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          OfferActions.createOfferFailure,
          OfferActions.updateOfferFailure,
          OfferActions.deleteOfferFailure
        ),
        tap(({ error }) => {
          this.notificationService.showMessage(
            NotificationSeverity.ERROR,
            NotificationSummary.ERROR,
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  deleteOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.deleteOffer),
      switchMap(({ id }) =>
        this.offerService.deleteOffer(id).pipe(
          map(() => OfferActions.deleteOfferSuccess()),
          catchError((error) => of(OfferActions.deleteOfferFailure({ error })))
        )
      )
    )
  );

  deleteOfferSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(OfferActions.deleteOfferSuccess),
        tap(() => {
          this.router.navigate(['/posts/offers']);
          this.notificationService.showMessage(
            NotificationSeverity.SUCCESS,
            NotificationSummary.SUCCESS,
            'Offer deleted successfully'
          );
        })
      ),
    { dispatch: false }
  );

  loadOffers$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadOffers),
      switchMap(({ filterOfferDto }) => {
        return this.offerService.getOffersByFilter(filterOfferDto).pipe(
          tap((posts) => console.log('OFFERS Loading...', posts)),
          map(({ posts, length }) =>
            OfferActions.loadOffersSuccess({ offers: posts, length })
          ),
          catchError((error) => of(OfferActions.loadOffersFailure({ error })))
        );
      })
    )
  );

  loadDetailedOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadDetailedOffer),
      switchMap(({ id: offerId }) =>
        this.offerService.getOfferById(offerId).pipe(
          map((offer) => {
            return OfferActions.loadDetailedOfferSuccess({ offer });
          }),
          catchError((error) =>
            of(OfferActions.loadDetailedOfferFailure({ error }))
          )
        )
      )
    )
  );

  loadEditingOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadEditingOffer),
      switchMap(({ id }) =>
        this.offerService.getOfferById(id).pipe(
          map((offer) => OfferActions.loadEditingOfferSuccess({ offer })),
          catchError((error) =>
            of(OfferActions.loadEditingOfferFailure({ error }))
          )
        )
      )
    )
  );

  loadOfferFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          OfferActions.loadDetailedOfferFailure,
          OfferActions.loadEditingOfferFailure
        ),
        tap(({ error }) => {
          this.router.navigate(['/posts/offers']);
          this.notificationService.showMessage(
            NotificationSeverity.ERROR,
            'Error',
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  // changeOfferFilter$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(OfferActions.changeOfferFilter),
  //     switchMap(({ filterOffer }) => {
  //       const {
  //         selectedCategory,
  //         selectedUser,
  //         isDiscountEnabled,
  //         isPricingEnabled,
  //         ...filterOfferDto
  //       } = filterOffer;
  //       return this.offerService.getOffersByFilter(filterOfferDto).pipe(
  //         tap((posts) => console.log('OFFERS FROM FILTER Loading...', posts)),
  //         map(({ posts, length }) =>
  //           OfferActions.loadOffersSuccess({
  //             offers: posts,
  //             length,
  //           })
  //         ),
  //         catchError((error) => of(OfferActions.loadOffersFailure({ error })))
  //       );
  //     })
  //   )
  // );

  loadAvailableTitles$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.changeOfferFilter, OfferActions.loadOfferTitles),
      switchMap(({ filterOffer: filter }) => {
        const {
          isDiscountEnabled,
          isPricingEnabled,
          selectedCategory,
          selectedUser,
          ...filterOfferDto
        } = filter;
        console.log(filterOfferDto);
        return this.offerService
          .getOfferDistinctPropertyByFilter('title', filterOfferDto)
          .pipe(
            map((titles) => OfferActions.loadOfferTitlesSuccess({ titles })),
            catchError(() => of())
          );
      })
    )
  );

  // loadAllCommentsFromOffer$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(OfferActions.loadAllCommentsFromOffer),
  //     switchMap(({ offerId }) => {
  //       return this.commentService.getAllCommentsByPostId(offerId).pipe(
  //         map((comments) =>
  //           OfferActions.loadAllCommentsFromOfferSuccess({ comments })
  //         ),
  //         catchError(() => of())
  //       );
  //     })
  //   )
  // );

  constructor(
    private action$: Actions,
    private offerService: OfferService,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private router: Router
  ) {}
}
