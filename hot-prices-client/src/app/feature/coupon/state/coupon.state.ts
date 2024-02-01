import { EntityState } from "@ngrx/entity";
import { Coupon } from "../models/coupon.model";
import { FilterCoupon } from "../models/coupon.filter";

export interface CouponState extends EntityState<Coupon> {
  filter?: FilterCoupon;
  length: number;
  titles: string[]
  editingCoupon?: Coupon;
  detailedCoupon?: Coupon;
}