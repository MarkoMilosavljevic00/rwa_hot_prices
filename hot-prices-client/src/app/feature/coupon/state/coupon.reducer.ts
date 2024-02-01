import { createReducer, on } from '@ngrx/store';
import * as Actions from './coupon.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Coupon } from '../models/coupon.model';
import { CouponState } from './coupon.state';

export const adapter = createEntityAdapter<Coupon>();

export const initialState: CouponState = adapter.getInitialState({
  length: 0,
  filter: {},
  titles: [],
});

export const couponReducer = createReducer(
  initialState,
  on(Actions.createCouponSuccess, Actions.updateCouponSuccess, (state, { coupon }) => {
    return {
      ...state,
      detailedCoupon: coupon,
    };
  }),
  on(Actions.deleteCouponSuccess, (state) => {
    return {
      ...state,
      detailedCoupon: undefined,
    };
  }),
  on(Actions.loadCouponsSuccess, (state, { coupons, length }) => {
    return adapter.setAll(coupons, {
      ...state,
      length,
    });
  }),
  on(Actions.loadDetailedCouponSuccess, (state, { coupon }) => {
    return {
      ...state,
      detailedCoupon: coupon,
    };
  }),
  on(Actions.loadEditingCouponSuccess, (state, { coupon }) => {
    return {
      ...state,
      editingCoupon: coupon,
    };
  }),
  on(Actions.changeCouponFilter, (state, { filterCoupon }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...filterCoupon,
      },
    };
  }),
  on(Actions.changeCouponSearchFilter, (state, { search }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        title: search,
      },
    };
  }),
  on(Actions.changeCouponPaginationFilter, (state, { pagination }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...pagination,
      },
    };
  }),
  on(Actions.clearCouponFilter, (state) => {
    return {
      ...state,
      filter: undefined,
    };
  }),
  on(Actions.loadCouponTitlesSuccess, (state, { titles }) => {
    return {
      ...state,
      titles,
    };
  }),
);
