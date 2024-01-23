import { routerReducer } from "@ngrx/router-store";
import { offerReducer } from "../feature/offer/state/offer.reducer";
import { categoryReducer } from "../feature/post/state/category/category.reducer";

export const appReducers = {
  offers: offerReducer,
  categories: categoryReducer,
  router: routerReducer, 
};