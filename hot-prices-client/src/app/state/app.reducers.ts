import { routerReducer } from "@ngrx/router-store";
import { offerReducer } from "../feature/offer/state/offer.reducer";
import { categoryReducer } from "../feature/post/state/category/category.reducer";
import { reactionReducer } from "../feature/reaction/state/reaction.reducer";
import { commentReducer } from "../feature/comment/state/comment.reducer";
import { authReducer } from "../feature/auth/state/auth.reducer";
import { userReducer } from "../feature/user/state/user.reducer";
import { conversationReducer } from "../feature/conversation/state/conversation.reducer";

export const appReducers = {
  auth: authReducer,
  user: userReducer,
  offers: offerReducer,
  conversations: conversationReducer,
  reaction: reactionReducer,
  comments: commentReducer,
  categories: categoryReducer,
  router: routerReducer, 
};