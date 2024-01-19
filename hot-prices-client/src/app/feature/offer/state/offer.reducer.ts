import { createReducer, on } from '@ngrx/store';
import * as Actions from './offer.action';
import { Offer } from '../models/offer.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { OfferState } from './offer.state';


const adapter = createEntityAdapter<Offer>();

export const initialState: OfferState = adapter.getInitialState({
  detailedOffer: undefined,
  editingOffer: undefined,
});

export const offerReducer = createReducer(
  initialState,
  on(Actions.loadDetailedOfferSuccess, (state, { offer }) => {
    return {
      ...state,
      detailedOffer: offer,
    }
  }),
  on(Actions.loadEditingOfferSuccess, (state, { offer }) => {
    return {
      ...state,
      editingOffer: offer,
    }
  }),
  on(Actions.resetEditingOffer, (state) => {
    return {
      ...state,
      editingOffer: undefined,
    }
  }),
  on(Actions.loadOffersSuccess, (state, { offers: songs }) =>
    adapter.setAll(songs, state)
  ),
  // on(Actions.rateSong, (state, { songId, rating }) =>
  //   adapter.updateOne(
  //     {
  //       id: songId,
  //       changes: {
  //         rating,
  //       },
  //     },
  //     state
  //   )
  // )
  // on(Actions.addSong, (state, { song}) => {
  //   return adapter.addOne(song, state);
  // })
);
