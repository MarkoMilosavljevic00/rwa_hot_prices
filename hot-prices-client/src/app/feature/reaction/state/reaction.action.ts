import { createAction, props } from '@ngrx/store';
import { Reaction } from '../models/reaction.model';
import { ReactionDto } from '../models/dtos/reaction.dto';

export const loadReaction = createAction(
  '[Reaction] Load reaction by User and Post Id',
  props<{ userId: number; postId: number }>()
);

export const loadReactionSuccess = createAction(
  '[Reaction] Load reaction by User and Post Id Success',
  props<{
    reaction?: Reaction;
    numOfHotReactions: number;
    numOfColdReactions: number;
    numOfDegrees: number;
  }>()
);

export const postOrUpdateReaction = createAction(
  '[Reaction] Post or Update reaction',
  props<{ reaction: ReactionDto }>()
);

export const postOrUpdateReactionSuccess = createAction(
  '[Reaction] Post or Update reaction success',
  props<{
    reaction?: Reaction;
    numOfHotReactions: number;
    numOfColdReactions: number;
    numOfDegrees: number;
  }>()
);
