import { EntityState } from "@ngrx/entity";
import { Offer } from "../models/offer.model";
import { FormGroup } from "@angular/forms";
import { FilterOfferDto } from "../models/dtos/filter-offer.dto";

export interface OfferState extends EntityState<Offer> {
  detailedOffer?: Offer;
  editingOffer?: Offer;
  titles: string[];
  filter: FilterOfferDto;
  length: number;
}