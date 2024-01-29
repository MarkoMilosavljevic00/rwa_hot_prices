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

@Injectable()
export class OfferEffects {
  loadOffers$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadOffers),
      switchMap(({ filterOfferDto: filterOffer }) => {
        const filterOfferDto: FilterOfferDto = filterOffer;
        return this.offerService.getOffers(filterOfferDto).pipe(
          map(({ offers, length }) =>
            OfferActions.loadOffersSuccess({ offers, length })
          ),
          catchError(() => of())
        );
      })
    )
  );

  loadAvailableTitles$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.changeFilter, OfferActions.loadTitles),
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
          .getOfferDistinctPropertyFilter('title', filterOfferDto)
          .pipe(
            map((titles) => OfferActions.loadTitlesSuccess({ titles })),
            catchError(() => of())
          );
      })
    )
  );

  loadDetailedOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadDetailedOffer),
      switchMap(({ offerId }) =>
        this.offerService.getOfferById(offerId).pipe(
          map((offer) => {
            console.log(offer);
            return OfferActions.loadDetailedOfferSuccess({ offer })
          }),
          catchError(() => of(OfferActions.loadDetailedOfferFailure()))
        )
      )
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

  loadEditingOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadEditingOffer),
      switchMap(({ offerId }) =>
        this.offerService.getOfferById(offerId).pipe(
          map((offer) => OfferActions.loadEditingOfferSuccess({ offer })),
          catchError(() => of())
        )
      )
    )
  );

  postOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.postOffer),
      switchMap(({ formOfferDto }) =>
        this.offerService.postOffer(formOfferDto).pipe(
          concatMap((offer) => {
            return [
              OfferActions.submittedOfferSuccess({ offer }),
              OfferActions.loadOffers({
                filterOfferDto: {
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

  updateffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.updateOffer),
      switchMap(({ offerId, formOfferDto }) =>
        this.offerService.updateOffer(offerId, formOfferDto).pipe(
          concatMap((offer) => {
            return [
              OfferActions.submittedOfferSuccess({ offer }),
              OfferActions.loadOffers({
                filterOfferDto: {
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

  navigateToOffer$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(OfferActions.submittedOfferSuccess),
        tap(({ offer }) => {
          this.router.navigate(['/posts/details/offer/' + offer.id]);
          this.messageService.add({
            severity: 'success',
            summary: 'Successly Submitted Offer',
            detail: 'You have successfully submitted your offer.',
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private offerService: OfferService,
    private commentService: CommentService,
    private messageService: MessageService,
    private router: Router
  ) {}
}
