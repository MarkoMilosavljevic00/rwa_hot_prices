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
  on(Actions.createConversationSuccess, Actions.updateConversationSuccess, (state, { conversation }) => {
    return {
      ...state,
      detailedConversation: conversation,
    };
  }),
  on(Actions.deleteConversationSuccess, (state) => {
    return {
      ...state,
      detailedConversation: undefined,
    };
  }),
  on(Actions.loadConversationsSuccess, (state, { conversations, length }) => {
    return adapter.setAll(conversations, {
      ...state,
      length,
    });
  }),
  on(Actions.loadDetailedConversationSuccess, (state, { conversation }) => {
    return {
      ...state,
      detailedConversation: conversation,
    };
  }),
  on(Actions.loadEditingConversationSuccess, (state, { conversation }) => {
    return {
      ...state,
      editingConversation: conversation,
    };
  }),
  on(Actions.changeConversationFilter, (state, { filterConversation }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...filterConversation,
      },
    };
  }),
  on(Actions.changeConversationSearchFilter, (state, { search }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        title: search,
      },
    };
  }),
  on(Actions.changeConversationPaginationFilter, (state, { pagination }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        ...pagination,
      },
    };
  }),
  on(Actions.clearConversationFilter, (state) => {
    return {
      ...state,
      filter: undefined,
    };
  }),
  on(Actions.loadConversationTitlesSuccess, (state, { titles }) => {
    return {
      ...state,
      titles,
    };
  }),
);
