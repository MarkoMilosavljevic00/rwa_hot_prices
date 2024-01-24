import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as OfferActions from './offer.action';
import { OfferService } from '../services/offer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PAGE } from 'src/app/common/constants';
import { FilterOfferDto } from '../models/dtos/filter-offer.dto';

@Injectable()
export class OfferEffects {

  loadOffers$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadOffers),
      switchMap(({ filterOffer }) => {
        const filterOfferDto: FilterOfferDto = filterOffer;
        return this.offerService.getOffers(filterOfferDto).pipe(
          map(({ offers, length }) => OfferActions.loadOffersSuccess({offers, length})),
          catchError(() => of())
        );
      })
    ));
    
  // loadAvailableValues$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(OfferActions.changeFilter),
  //     switchMap(({filter}) => {
  //       return this.offerService.getAvailableValues(filter).pipe(
  //         map((availableValues) => OfferActions.loadAvailableValuesSuccess({ availableValues })),
  //         catchError(() => of())
  //       );
  //     })
  //   ));


  loadDetailedOffer$ = createEffect(() =>
    this.action$.pipe(
      ofType(OfferActions.loadDetailedOffer),
      switchMap(({ offerId }) =>
        this.offerService.getOfferById(offerId).pipe(
          map((offer) => OfferActions.loadDetailedOfferSuccess({ offer })),
          catchError(() => of(OfferActions.loadDetailedOfferFailure()))
        )
      )
    )
  );

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
                filterOffer: { pageIndex: PAGE.INITIAL_INDEX, pageSize: PAGE.SIZE },
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
                filterOffer: { pageIndex: PAGE.INITIAL_INDEX, pageSize: PAGE.SIZE },
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
    private messageService: MessageService,
    private router: Router
  ) {}
}
