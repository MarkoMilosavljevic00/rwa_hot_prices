import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponItemComponent } from './components/coupon-item/coupon-item.component';
import { CouponDetailsComponent } from './components/coupon-details/coupon-details.component';
import { CouponFormularComponent } from './components/coupon-formular/coupon-formular.component';

@NgModule({
  declarations: [CouponListComponent, CouponItemComponent, CouponDetailsComponent, CouponFormularComponent],
  imports: [RouterModule, SharedModule],
  exports: [CouponListComponent, CouponItemComponent, CouponDetailsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CouponModule {}
