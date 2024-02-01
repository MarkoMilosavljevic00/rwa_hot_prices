import { AuthEffects } from '../feature/auth/state/auth.effects';
import { CommentEffects } from '../feature/comment/state/comment.effects';
import { ConversationEffects } from '../feature/conversation/state/conversation.effects';
import { CouponEffects } from '../feature/coupon/state/coupon.effects';
import { OfferEffects } from '../feature/offer/state/offer.effects';
import { CategoryEffects } from '../feature/post/state/category/category.effects';
import { ReactionEffects } from '../feature/reaction/state/reaction.effects';
import { UserEffects } from '../feature/user/state/user.effects';

// export const appEffects = [AuthEffects, ConversationEffects, UserEffects, CategoryEffects, OfferEffects, ReactionEffects, CommentEffects, ];
export const appEffects = [AuthEffects, ConversationEffects, CouponEffects];
