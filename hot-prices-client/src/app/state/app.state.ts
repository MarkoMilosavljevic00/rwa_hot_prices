import { RouterReducerState } from "@ngrx/router-store";
import { CommentState } from "../feature/comment/state/comment.state";
import { OfferState } from "../feature/offer/state/offer.state";
import { CategoryState } from "../feature/post/state/category/category.state";
import { ReactionState } from "../feature/reaction/state/reaction.state";
import { AuthState } from "../feature/auth/state/auth.state";

export interface AppState {
  auth: AuthState;
  router: RouterReducerState;
  offers: OfferState;
  categories: CategoryState;
  reaction: ReactionState;
  comments: CommentState;
}