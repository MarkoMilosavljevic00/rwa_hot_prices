import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';
import { FormOfferDto } from '../models/dtos/form-offer.dto';
import { FilterOfferDto } from '../models/dtos/filter-offer.dto';
import { InitialValues } from 'src/app/common/interfaces/initial-values.interface';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private readonly http: HttpClient) {}

  getOfferById(id: number) {
    return this.http.get<Offer>(`${environment.api}/offer/${id}`);
  }

  getOffers(filterOfferDto?: FilterOfferDto) {
    if (!filterOfferDto)
      return this.http.get<{ offers: Offer[]; length: number }>(
        `${environment.api}/offer`
      );

    // const { title, pageSize, pageIndex } = filterOfferDto;
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    // console.log(params);

    // if (pageSize != undefined && pageIndex != undefined) {
    //   params = params
    //     .set('pageSize', pageSize.toString())
    //     .set('pageIndex', pageIndex.toString());
    // }

    console.log(params)

    return this.http.get<{ offers: Offer[]; length: number }>(
      `${environment.api}/offer`,
      { params }
    );
  }

  getOffersTitles(search?: string) {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<string[]>(`${environment.api}/offer/titles`, {
      params,
    });
  }

  getAvailableValues(filterOfferDto: FilterOfferDto) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<InitialValues>(
      `${environment.api}/offer/available-values`,
      { params }
    );
  }

  getOfferDistinctProperty(key: string) {
    return this.http.get<string[]>(
      `${environment.api}/offer/distinct-property/${key}`
    );
  }

  getOfferDistinctPropertyFilter(key: string, filterOfferDto: FilterOfferDto) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

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
