import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationState } from './conversation.state';
import { adapter } from './conversation.reducer';
import { Conversation } from '../models/conversation.model';

const { selectIds, selectTotal, selectAll, selectEntities } =
  adapter.getSelectors();

export const selectConversationsFeature =
  createFeatureSelector<ConversationState>('conversations');

export const selectConversationsIds = createSelector(
  selectConversationsFeature,
  (conversationState) => conversationState.ids
);

export const selectConversationsList = createSelector(selectConversationsFeature, (conversations) =>
  (conversations.ids as Array<string | number>).reduce(
    (acc: Conversation[], id: number | string) => {
      const conversation = conversations.entities[id];
      if (conversation != null) {
        acc.push(<Conversation>conversation);
      }
      return acc;
    },
    []
  )
);

export const selectDetailedConversation = createSelector(
  selectConversationsFeature,
  (conversationState) => conversationState.detailedConversation
);

export const selectEditingConversation = createSelector(
  selectConversationsFeature,
  (conversationState) => conversationState.editingConversation
);

export const selectLengthOfConversation = createSelector(
  selectConversationsFeature,
  (conversationState) => conversationState.length
);

export const selectFilterConversation = createSelector(
  selectConversationsFeature,
  (conversationState) => conversationState.filter
);

export const selectConversationsTitles = createSelector(
  selectConversationsFeature,
  (conversationState) => conversationState.titles
);