import { OfferState } from "../feature/offer/state/offer.state";
import { CategoryState } from "../feature/post/state/category/category.state";

export interface AppState {
  offers: OfferState;
  categories: CategoryState;
}