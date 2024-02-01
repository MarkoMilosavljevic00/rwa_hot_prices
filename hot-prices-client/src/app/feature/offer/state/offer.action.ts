import { createAction, props } from '@ngrx/store';
import { Offer } from '../models/offer.model';
import { FormOfferDto } from '../models/dtos/form-offer.dto';
import { FilterOfferDto } from '../models/dtos/filter-offer.dto';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { FilterOffer } from 'src/app/feature/offer/models/offer.filter';

// Create Coupon

export const createOffer = createAction(
  '[Offer] Create Offer',
  props<{ formOfferDto: FormOfferDto }>()
);

export const createOfferSuccess = createAction(
  '[Offer] Create Offer success',
  props<{ offer: Offer }>()
);

export const createOfferFailure = createAction(
  '[Offer] Create Offer failure',
  props<{ error: any }>()
);

// Update Coupon

export const updateOffer = createAction(
  '[Offer] Update offer',
  props<{ id: number; formOfferDto: FormOfferDto }>()
);

export const updateOfferSuccess = createAction(
  '[Offer] Update offer success',
  props<{ offer: Offer }>()
);

export const updateOfferFailure = createAction(
  '[Offer] Update offer failure',
  props<{ error: any }>()
);

export const submittedOfferSuccess = createAction(
  '[Offer] Submitted Offer success',
  props<{ offer: Offer }>()
);

// Delete Coupon

export const deleteOffer = createAction(
  '[Offer] Delete offer',
  props<{ id: number }>()
);

export const deleteOfferSuccess = createAction('[Offer] Delete offer success');

export const deleteOfferFailure = createAction(
  '[Offer] Delete offer failure',
  props<{ error: any }>()
);

// Load Coupons

export const loadOffers = createAction(
  '[Offer] Load offers',
  props<{ filterOfferDto: FilterOfferDto }>()
);

export const loadOffersSuccess = createAction(
  '[Offer] Load offers success',
  props<{ offers: Offer[]; length: number }>()
);

export const loadOffersFailure = createAction(
  '[Offer] Load offers failure',
  props<{ error: any }>()
);

// Load detailed Offer

export const loadDetailedOffer = createAction(
  '[Offer] Load detailed offer',
  props<{ id: number }>()
);

export const loadDetailedOfferSuccess = createAction(
  '[Offer] Load detailed offer success',
  props<{ offer: Offer }>()
);

export const loadDetailedOfferFailure = createAction(
  '[Offer] Load detailed offer failure',
  props<{ error: any }>()
);

export const clearDetailedOffer = createAction('[Offer] Clear detailed offer');

// Load editing Offer

export const loadEditingOffer = createAction(
  '[Offer] Load editing offer',
  props<{ id: number }>()
);

export const loadEditingOfferSuccess = createAction(
  '[Offer] Load editing offer success',
  props<{ offer: Offer }>()
);

export const loadEditingOfferFailure = createAction(
  '[Offer] Load editing offer failure',
  props<{ error: any }>()
);

export const clearEditingOffer = createAction('[Offer] Clear editing offer');

// Change filter

export const changeOfferFilter = createAction(
  '[Offer] Change Offer filter',
  props<{ filterOffer: FilterOffer }>()
);

export const changeOfferPaginationFilter = createAction(
  '[Offer] Change Offer pagination filter',
  props<{ pagination: Pagination }>()
);

export const changeOfferSearchFilter = createAction(
  '[Offer] Change Offer search filter',
  props<{ search: string }>()
);

export const clearOfferFilter = createAction('[Offer] Clear filter');

// Load titles

export const loadOfferTitles = createAction(
  '[Offer] Load Offer titles',
  props<{ filterOffer: FilterOffer }>()
);

export const loadOfferTitlesSuccess = createAction(
  '[Offer] Load Offer titles success',
  props<{ titles: string[] }>()
);