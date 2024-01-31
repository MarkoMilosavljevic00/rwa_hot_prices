import { createReducer, on } from '@ngrx/store';
import * as Actions from './conversation.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Conversation } from '../models/conversation.model';
import { ConversationState } from './conversation.state';

export const adapter = createEntityAdapter<Conversation>();

export const initialState: ConversationState = adapter.getInitialState({
  length: 0,
  filter: {},
  titles: [],
});

export const conversationReducer = createReducer(
  initialState,
  on(Actions.loadConversationsSuccess, (state, { conversations, length }) => {
    return adapter.setAll(conversations, state);
  })
  // on(Actions.changeFilter, (state, { filterOffer: filter }) => {
  //   return {
  //     ...state,
  //     filter: {
  //       ...state.filter,
  //       ...filter,
  //     },
  //   };
  // }),
  // on(Actions.changeSearchFilter, (state, { search }) => {
  //   return {
  //     ...state,
  //     filter: {
  //       ...state.filter,
  //       title: search,
  //     },
  //   };
  // }),
  // on(Actions.changePaginationFilter, (state, { pagination }) => {
  //   return {
  //     ...state,
  //     filter: {
  //       ...state.filter,
  //       ...pagination,
  //     },
  //   };
  // }),
  // on(Actions.clearFilter, (state) => {
  //   return {
  //     ...state,
  //     filter: undefined,
  //   };
  // }),
  // on(Actions.loadTitlesSuccess, (state, { titles }) => {
  //   return {
  //     ...state,
  //     titles,
  //   };
  // }),
  // // on(Actions.loadAvailableValuesSuccess, (state, { availableValues }) => {
  // //   return {
  // //     ...state,
  // //     initialValues: {
  // //       ...state.initialValues,
  // //       ...availableValues,
  // //     },
  // //   };
  // // }),
  // on(Actions.loadOffersSuccess, (state, { offers, length }) => {
  //   return adapter.setAll(offers, {
  //     ...state,
  //     length,
  //   });
  // }),
  // on(Actions.loadDetailedOfferSuccess, (state, { offer }) => {
  //   return {
  //     ...state,
  //     detailedConversation: offer,
  //   };
  // }),
  // // on(Actions.loadAllCommentsFromOfferSuccess, (state, { comments }) => {
  // //   return {
  // //     ...state,
  // //     detailedOffer: {
  // //       ...state.detailedOffer!,
  // //       comments,
  // //     }
  // //   }
  // // }),
  // on(Actions.clearDetailedOffer, (state) => {
  //   return {
  //     ...state,
  //     detailedConversation: undefined,
  //   };
  // }),
  // on(Actions.loadEditingOfferSuccess, (state, { offer }) => {
  //   return {
  //     ...state,
  //     editingConversation: offer,
  //   };
  // }),
  // on(Actions.clearEditingOffer, (state) => {
  //   return {
  //     ...state,
  //     editingConversation: undefined,
  //   };
  // }),
  // on(Actions.submittedOfferSuccess, (state, { offer }) => {
  //   // return adapter.addOne(offer, state);
  //   return {
  //     ...state,
  //     detailedConversation: offer,
  //   };
  // })
  // // on(Actions.rateSong, (state, { songId, rating }) =>
  // //   adapter.updateOne(
  // //     {
  // //       id: songId,
  // //       changes: {
  // //         rating,
  // //       },
  // //     },
  // //     state
  // //   )
  // // )
  // // on(Actions.addSong, (state, { song}) => {
  // //   return adapter.addOne(song, state);
  // // })
);
