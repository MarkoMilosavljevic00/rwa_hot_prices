import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as OfferActions from './offer.action';
import { OfferService } from '../services/offer.service';

@Injectable()
export class OfferEffects {
  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.loadOffers),
      mergeMap(() =>
        this.offerService.get().pipe(
          map((offers) => OfferActions.loadOffersSuccess({ offers })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  loadDetailedOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.loadDetailedOffer),
      switchMap(({ offerId }) =>
        this.offerService.getById(offerId).pipe(
          map((offer) => OfferActions.loadDetailedOfferSuccess({ offer })),
          catchError(() => of(OfferActions.loadDetailedOfferFailure()))
        )
      )
    )
  );

  loadEditingOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.loadEditingOffer),
      switchMap(({ offerId }) =>
        this.offerService.getById(offerId).pipe(
          map((offer) => OfferActions.loadEditingOfferSuccess({ offer })),
          catchError(() => of())
        )
      )
    )
  );

  constructor(private actions$: Actions, private offerService: OfferService) {}
}
