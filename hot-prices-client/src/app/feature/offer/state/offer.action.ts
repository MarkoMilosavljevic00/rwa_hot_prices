import { createAction, props } from '@ngrx/store';
import { Offer } from '../models/offer.model';

export const loadOffers = createAction('[Offer] Load offers');
export const loadOffersSuccess = createAction(
  '[Offer] Load offers success',
  props<{ offers: Offer[] }>()
);

export const loadDetailedOffer = createAction(
  '[Offer] Load detailed offer',
  props<{ offerId: number }>()
);

export const loadDetailedOfferSuccess = createAction(
  '[Offer] Load detailed offer success',
  props<{ offer: Offer }>()
);

export const loadDetailedOfferFailure = createAction(
  '[Offer] Load detailed offer failure'
);

export const loadEditingOffer = createAction(
  '[Offer] Load editing offer',
  props<{ offerId: number }>()
);

export const loadEditingOfferSuccess = createAction(
  '[Offer] Load editing offer success',
  props<{ offer: Offer }>()
);

export const loadEditingOfferFailure = createAction(
  '[Offer] Load editing offer failure'
);

export const resetEditingOffer = createAction(
  '[Offer] Reset editing offer'
);

// export const rateSong = createAction(
//   'Rate a song',
//   props<{ songId: number; rating: SongRating }>()
// );
