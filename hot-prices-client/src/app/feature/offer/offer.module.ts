import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { RouterModule } from '@angular/router';
// import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [OfferListComponent, OfferItemComponent, OfferDetailsComponent],
  imports: [RouterModule, SharedModule],
  exports: [OfferListComponent, OfferItemComponent, OfferDetailsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class OfferModule {}
