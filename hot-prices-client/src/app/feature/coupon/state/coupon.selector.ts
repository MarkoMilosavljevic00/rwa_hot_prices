import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CouponState } from './coupon.state';
import { adapter } from './coupon.reducer';
import { Coupon } from '../models/coupon.model';

const { selectIds, selectTotal, selectAll, selectEntities } =
  adapter.getSelectors();

export const selectCouponsFeature =
  createFeatureSelector<CouponState>('coupons');

export const selectCouponsIds = createSelector(
  selectCouponsFeature,
  (couponState) => couponState.ids
);

export const selectCouponsList = createSelector(selectCouponsFeature, (coupons) =>
  (coupons.ids as Array<string | number>).reduce(
    (acc: Coupon[], id: number | string) => {
      const coupon = coupons.entities[id];
      if (coupon != null) {
        acc.push(<Coupon>coupon);
      }
      return acc;
    },
    []
  )
);

export const selectDetailedCoupon = createSelector(
  selectCouponsFeature,
  (couponState) => couponState.detailedCoupon
);

export const selectEditingCoupon = createSelector(
  selectCouponsFeature,
  (couponState) => couponState.editingCoupon
);

export const selectLengthOfCoupon = createSelector(
  selectCouponsFeature,
  (couponState) => couponState.length
);

export const selectFilterCoupon = createSelector(
  selectCouponsFeature,
  (couponState) => couponState.filter
);

export const selectCouponsTitles = createSelector(
  selectCouponsFeature,
  (couponState) => couponState.titles
);