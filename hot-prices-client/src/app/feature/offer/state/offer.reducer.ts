import { createReducer, on } from '@ngrx/store';
import * as Actions from './offer.action';
import { Offer } from '../models/offer.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { OfferState } from './offer.state';

const adapter = createEntityAdapter<Offer>();

export const initialState: OfferState = adapter.getInitialState({
  length: 0,
  filter: {},
  titles: [],
});

export const offerReducer = createReducer(
  initialState,
  on(Actions.changeFilter, (state, { filterOffer: filter }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...filter,
      },
    };
  }),
  on(Actions.changeSearchFilter, (state, { search }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        title: search,
      },
    };
  }),
  on(Actions.changePaginationFilter, (state, { pagination }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...pagination,
      },
    };
  }),
  on(Actions.clearFilter, (state) => {
    return {
      ...state,
      filter: undefined,
    };
  }),
  on(Actions.loadTitlesSuccess, (state, { titles }) => {
    return {
      ...state,
      titles,
    };
  }),
  // on(Actions.loadAvailableValuesSuccess, (state, { availableValues }) => {
  //   return {
  //     ...state,
  //     initialValues: {
  //       ...state.initialValues,
  //       ...availableValues,
  //     },
  //   };
  // }),
  on(Actions.loadOffersSuccess, (state, { offers, length }) => {
    return adapter.setAll(offers, {
      ...state,
      length,
    });
  }),
  on(Actions.loadDetailedOfferSuccess, (state, { offer }) => {
    return {
      ...state,
      detailedOffer: offer,
    };
  }),
  // on(Actions.loadAllCommentsFromOfferSuccess, (state, { comments }) => {
  //   return {
  //     ...state,
  //     detailedOffer: {
  //       ...state.detailedOffer!,
  //       comments,
  //     }
  //   }
  // }),
  on(Actions.clearDetailedOffer, (state) => {
    return {
      ...state,
      detailedOffer: undefined,
    };
  }),
  on(Actions.loadEditingOfferSuccess, (state, { offer }) => {
    return {
      ...state,
      editingOffer: offer,
    };
  }),
  on(Actions.clearEditingOffer, (state) => {
    return {
      ...state,
      editingOffer: undefined,
    };
  }),
  on(Actions.submittedOfferSuccess, (state, { offer }) => {
    // return adapter.addOne(offer, state);
    return {
      ...state,
      detailedOffer: offer,
    };
  })
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
