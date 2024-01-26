import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReactionState } from './reaction.state';


export const selectReactionFeature = createFeatureSelector<ReactionState>('reaction');

export const selectCurrentReaction = createSelector(
  selectReactionFeature,
  (state: ReactionState) => state.currentReaction
);




