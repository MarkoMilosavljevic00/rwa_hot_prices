import { createAction, props } from '@ngrx/store';
import { Offer } from '../models/offer.model';
import { FormOfferDto } from '../models/dtos/form-offer.dto';
import { FilterOfferDto } from '../models/dtos/filter-offer.dto';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { InitialValues } from 'src/app/common/interfaces/initial-values.interface';
import { FilterOffer } from 'src/app/common/interfaces/filter-offer.interface';

export const loadOffers = createAction(
  '[Offer] Load offers',
  props<{ filterOffer: FilterOfferDto }>()
);

export const loadOffersSuccess = createAction(
  '[Offer] Load offers success',
  props<{ offers: Offer[]; length: number }>()
);

export const changeFilter = createAction(
  '[Offer] Change filter',
  props<{ filter: FilterOffer }>()
);

export const changePaginationFilter = createAction(
  '[Offer] Change pagination filter',
  props<{ pagination: Pagination }>()
);

export const changeSearchFilter = createAction(
  '[Offer] Change search filter',
  props<{ search: string }>()
);

export const loadAvailableValuesSuccess = createAction(
  '[Offer] Load available values success',
  props<{ availableValues: InitialValues }>()
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

export const clearEditingOffer = createAction('[Offer] Clear editing offer');

export const clearDetailedOffer = createAction('[Offer] Clear detailed offer');

export const postOffer = createAction(
  '[Offer] Post offer',
  props<{ formOfferDto: FormOfferDto }>()
);

export const updateOffer = createAction(
  '[Offer] Update offer',
  props<{ offerId: number; formOfferDto: FormOfferDto }>()
);

export const submittedOfferSuccess = createAction(
  '[Offer] Submitted offer success',
  props<{ offer: Offer }>()
);

// export const updateOfferSuccess = createAction(
//   '[Offer] Update offer',
//   props<{ offer: Offer }>()
// );

// export const rateSong = createAction(
//   'Rate a song',
//   props<{ songId: number; rating: SongRating }>()
// );
