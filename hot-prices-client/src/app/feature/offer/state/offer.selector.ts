import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Offer } from '../models/offer.model';
import { OfferState } from './offer.state';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { ImageInfo } from '../components/offer-details/offer-details.component';
import { selectRouteParams } from 'src/app/state/app.selectors';
import { Params } from '@angular/router';
import { isNotUndefined } from 'src/app/common/type-guards';

// export const selectOffersFeature = createSelector(
//   (state: AppState) => state.offers,
//   (offers) => offers
// );

export const selectOffersFeature = createFeatureSelector<OfferState>('offers');

export const selectOfferIds = createSelector(
  selectOffersFeature,
  (offerState) => offerState.ids
);

export const selectOffersList = createSelector(selectOffersFeature, (offers) =>
  (offers.ids as Array<string | number>).reduce(
    (acc: Offer[], id: number | string) => {
      const offer = offers.entities[id];
      if (offer != null) {
        acc.push(<Offer>offer);
      }
      return acc;
    },
    []
  )
);

export const selectDetailedOffer = createSelector(
  selectOffersFeature,
  (offerState) => offerState.detailedOffer
);

export const selectEditingOffer = createSelector(
  selectOffersFeature,
  (offerState) => offerState.editingOffer
);

export const selectLengthOfOffers = createSelector(
  selectOffersFeature,
  (offerState) => offerState.length
);

export const selectFilterOffer = createSelector(
  selectOffersFeature,
  (offerState) => offerState.filter
);

export const selectOffersTitles = createSelector(
  selectOffersFeature,
  (offerState) => offerState.titles
);




