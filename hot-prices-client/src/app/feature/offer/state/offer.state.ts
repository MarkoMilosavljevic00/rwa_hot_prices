import { EntityState } from "@ngrx/entity";
import { Offer } from "../models/offer.model";
import { FormGroup } from "@angular/forms";

export interface OfferState extends EntityState<Offer> {
  detailedOffer?: Offer;
  editingOffer?: Offer;
}