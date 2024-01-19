import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { RouterModule } from '@angular/router';
import { OfferFormularComponent } from './components/offer-formular/offer-formular.component';
import { StoreModule } from '@ngrx/store';
import { offerReducer } from './state/offer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OfferEffects } from './state/offer.effects';
// import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    OfferListComponent,
    OfferItemComponent,
    OfferDetailsComponent,
    OfferFormularComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    StoreModule.forFeature('offers', offerReducer),
    EffectsModule.forFeature([OfferEffects])
  ],
  exports: [OfferListComponent, OfferItemComponent, OfferDetailsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class OfferModule {}
