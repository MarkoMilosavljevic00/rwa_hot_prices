import { createReducer, on } from '@ngrx/store';
import * as Actions from './reaction.action';
import { ReactionState } from './reaction.state';

// const adapter = createEntityAdapter<Reaction>();

export const initialState: ReactionState = {};

export const reactionReducer = createReducer(
  initialState,
  on(
    Actions.loadReactionSuccess,
    (
      state,
      { reaction, numOfHotReactions, numOfColdReactions, numOfDegrees }
    ) => {
      return {
        ...state,
        currentReaction: reaction,
        numOfHotReactions,
        numOfColdReactions,
        numOfDegrees,
      };
    }
  )
);
