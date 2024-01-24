import { EntityState } from "@ngrx/entity";
import { Offer } from "../models/offer.model";
import { FormGroup } from "@angular/forms";
import { FilterOfferDto } from "../models/dtos/filter-offer.dto";
import { InitialValues } from "src/app/common/interfaces/initial-values.interface";
import { FilterOffer } from "src/app/common/interfaces/filter-offer.interface";

export interface OfferState extends EntityState<Offer> {
  detailedOffer?: Offer;
  editingOffer?: Offer;
  filter: FilterOffer;
  length: number;
}