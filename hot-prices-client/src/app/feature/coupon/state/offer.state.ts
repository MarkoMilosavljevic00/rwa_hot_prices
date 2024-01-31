import { EntityState } from "@ngrx/entity";
import { Offer } from "../models/offer.model";
import { FormGroup } from "@angular/forms";
import { FilterOfferDto } from "../models/dtos/filter-offer.dto";
import { InitialValues } from "src/app/common/interfaces/initial-values.interface";
import { FilterOffer } from "src/app/feature/offer/models/offer.filter";

export interface OfferState extends EntityState<Offer> {
  filter?: FilterOffer;
  length: number;
  titles: string[]
  editingOffer?: Offer;
  detailedOffer?: Offer;
}