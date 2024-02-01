import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponItemComponent } from './components/coupon-item/coupon-item.component';
import { CouponDetailsComponent } from './components/coupon-details/coupon-details.component';
import { CouponFormularComponent } from './components/coupon-formular/coupon-formular.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CouponEffects } from './state/coupon.effects';
import { couponReducer } from './state/coupon.reducer';
import { CouponFilterComponent } from './components/coupon-filter/coupon-filter.component';

@NgModule({
  declarations: [
    CouponListComponent,
    CouponItemComponent,
    CouponDetailsComponent,
    CouponFormularComponent,
    CouponFilterComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    StoreModule.forFeature('coupons', couponReducer),
    EffectsModule.forFeature([CouponEffects]),
    StoreRouterConnectingModule,
  ],
  exports: [
    CouponListComponent,
    CouponItemComponent,
    CouponDetailsComponent,
    CouponFilterComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CouponModule {}
