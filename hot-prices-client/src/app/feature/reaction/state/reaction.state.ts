import { Reaction } from "../models/reaction.model";

export interface ReactionState {
  currentReaction?: Reaction;
  numOfHotReactions?: number;
  numOfColdReactions?: number;
  numOfDegrees?: number;
}