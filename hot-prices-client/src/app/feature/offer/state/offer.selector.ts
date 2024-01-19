import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Offer } from '../models/offer.model';
import { OfferState } from './offer.state';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { ImageInfo } from '../components/offer-details/offer-details.component';

// export const selectOffersFeature = createSelector(
//   (state: AppState) => state.offers,
//   (offers) => offers
// );

export const selectOffersFeature = createFeatureSelector<OfferState>('offers');

export const selectOfferIds = createSelector(
  selectOffersFeature,
  (offers) => offers.ids
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
  (offers) => offers.detailedOffer
);

export const selectEditingOffer = createSelector(
  selectOffersFeature,
  (offers) => offers.editingOffer
);



