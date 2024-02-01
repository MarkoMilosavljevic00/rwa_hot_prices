import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { Coupon } from '../models/coupon.model';
import { FilterCouponDto } from '../models/dtos/filter-coupon.dto';
import { FormCouponDto } from '../models/dtos/form-coupon.dto';
import { FilterCoupon } from '../models/coupon.filter';


// Create Coupon 

export const createCoupon = createAction(
  '[Coupon] Create Coupon',
  props<{ formCouponDto: FormCouponDto }>()
);

export const createCouponSuccess = createAction(
  '[Coupon] Create Coupon success',
  props<{ coupon: Coupon }>()
);

export const createCouponFailure = createAction(
  '[Coupon] Create Coupon failure',
  props<{ error: any }>()
);

// Update Coupon

export const updateCoupon = createAction(
  '[Coupon] Update Coupon',
  props<{ id: number; formCouponDto: FormCouponDto }>()
);

export const updateCouponSuccess = createAction(
  '[Coupon] Update Coupon success',
  props<{ coupon: Coupon }>()
);

export const updateCouponFailure = createAction(
  '[Coupon] Update Coupon failure',
  props<{ error: any }>()
);

// Delete Coupon

export const deleteCoupon = createAction(
  '[Coupon] Delete Coupon',
  props<{ id: number }>()
);

export const deleteCouponSuccess = createAction(
  '[Coupon] Delete Coupon success'
);

export const deleteCouponFailure = createAction(
  '[Coupon] Delete Coupon failure',
  props<{ error: any }>()
);

// Load Coupons

export const loadCoupons = createAction(
  '[Coupon] Load Coupons',
  props<{ filterCouponDto: FilterCouponDto }>()
);

export const loadCouponsSuccess = createAction(
  '[Coupon] Load Coupons success',
  props<{ coupons: Coupon[]; length: number }>()
);

export const loadCouponsFailure = createAction(
  '[Coupon] Load Coupons failure',
  props<{ error: any }>()
);

// Load detailed Coupon

export const loadDetailedCoupon = createAction(
  '[Coupon] Load detailed Coupon',
  props<{ id: number }>()
);

export const loadDetailedCouponSuccess = createAction(
  '[Coupon] Load detailed Coupon success',
  props<{ coupon: Coupon }>()
);

export const loadDetailedCouponFailure = createAction(
  '[Coupon] Load detailed Coupon failure',
  props<{ error: any }>()
);

export const clearDetailedCoupon = createAction(
  '[Coupon] Clear detailed Coupon'
);

// Load editing Coupon

export const loadEditingCoupon = createAction(
  '[Coupon] Load editing Coupon',
  props<{ id: number }>()
);

export const loadEditingCouponSuccess = createAction(
  '[Coupon] Load editing Coupon success',
  props<{ coupon: Coupon }>()
);

export const loadEditingCouponFailure = createAction(
  '[Coupon] Load editing Coupon failure',
  props<{ error: any }>()
);

export const clearEditingCoupon = createAction(
  '[Coupon] Clear editing Coupon'
);

// Change Filter

export const changeCouponFilter = createAction(
  '[Coupon] Change Coupon filter',
  props<{ filterCoupon: FilterCoupon }>()
);

export const changeCouponPaginationFilter = createAction(
  '[Coupon] Change Coupon pagination filter',
  props<{ pagination: Pagination }>()
);

export const changeCouponSearchFilter = createAction(
  '[Coupon] Change Coupon search filter',
  props<{ search: string }>()
);

export const clearCouponFilter = createAction(
  '[Coupon] Clear Coupon filter'
);

// Load titles

export const loadCouponTitles = createAction(
  '[Coupon] Load Coupon titles',
  props<{ filterCoupon: FilterCoupon }>()
);

export const loadCouponTitlesSuccess = createAction(
  '[Coupon] Load Coupon titles success',
  props<{ titles: string[] }>()
);
