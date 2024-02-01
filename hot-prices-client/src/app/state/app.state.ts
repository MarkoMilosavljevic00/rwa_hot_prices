import { RouterReducerState } from "@ngrx/router-store";
import { CommentState } from "../feature/comment/state/comment.state";
import { OfferState } from "../feature/offer/state/offer.state";
import { CategoryState } from "../feature/post/state/category/category.state";
import { ReactionState } from "../feature/reaction/state/reaction.state";
import { AuthState } from "../feature/auth/state/auth.state";
import { UserState } from "../feature/user/state/user.state";
import { ConversationState } from "../feature/conversation/state/conversation.state";
import { CouponState } from "../feature/coupon/state/coupon.state";

export interface AppState {
  auth: AuthState;
  user: UserState;
  offers: OfferState;
  conversations: ConversationState;
  coupons: CouponState;
  comments: CommentState;
  reaction: ReactionState;
  categories: CategoryState;
  router: RouterReducerState;
}