import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';
import { FormOfferDto } from '../models/dtos/form-offer.dto';
import { FilterOfferDto } from '../models/dtos/filter-offer.dto';
import { InitialValues } from 'src/app/common/interfaces/initial-values.interface';
import { PostType } from 'src/app/common/enums/post-type.enum';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private readonly http: HttpClient) {}

  getOfferById(id: number) {
    return this.http.get<Offer>(`${environment.api}/offer/${id}`);
  }

  getOffersByFilter(filterOfferDto: FilterOfferDto) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.OFFER)

    return this.http.get<{ offers: Offer[]; length: number }>(
      `${environment.api}/offer/get-offers-by-filter`,
      { params }
    );
  }

  getOfferDistinctProperty(key: string) {
    return this.http.get<string[]>(
      `${environment.api}/offer/distinct-property/${key}`
    );
  }

  getOfferDistinctPropertyByFilter(key: string, filterOfferDto: FilterOfferDto) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.OFFER)

    return this.http.get<string[]>(
      `${environment.api}/offer/distinct-property-filter/${key}`,
      { params }
    );
  }

  postOffer(offer: FormOfferDto) {
    return this.http.post<Offer>(`${environment.api}/offer`, offer);
  }

  updateOffer(id: number, offer: FormOfferDto) {
    return this.http.patch<Offer>(`${environment.api}/offer/${id}`, offer);
  }
}
