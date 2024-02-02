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

  createOffer(offer: FormOfferDto) {
    return this.http.post<Offer>(`${environment.api}/post`, offer);
  }

  updateOffer(id: number, offer: FormOfferDto) {
    return this.http.patch<Offer>(`${environment.api}/post/${id}`, offer);
  }

  deleteOffer(id: number) {
    return this.http.delete<Offer>(`${environment.api}/post/${id}`);
  }

  getOfferById(id: number) {
    return this.http.get<Offer>(
      `${environment.api}/post/${PostType.OFFER}/${id}`
    );
  }

  getOfferByIdAdmin(id: number) {
    return this.http.get<Offer>(
      `${environment.api}/post/admin/${PostType.OFFER}/${id}`
    );
  }

  getOffersByFilter(filterOfferDto: FilterOfferDto) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.OFFER);

    return this.http.get<{ posts: Offer[]; length: number }>(
      `${environment.api}/post/get-posts-by-filter`,
      { params }
    );
  }

  getOffersByFilterAdmin(filterOfferDto: FilterOfferDto) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.OFFER);

    return this.http.get<{ posts: Offer[]; length: number }>(
      `${environment.api}/post/admin/get-posts-by-filter`,
      { params }
    );
  }

  getOfferDistinctProperty(key: string) {
    let params = new HttpParams().set('postType', PostType.OFFER);

    return this.http.get<string[]>(
      `${environment.api}/post/distinct-property-filter/${key}`,
      { params }
    );
  }

  getOfferDistinctPropertyByFilter(
    key: string,
    filterOfferDto: FilterOfferDto
  ) {
    let params = new HttpParams();

    Object.keys(filterOfferDto).forEach((key: string) => {
      const value = filterOfferDto[key as keyof FilterOfferDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.OFFER);

    return this.http.get<string[]>(
      `${environment.api}/post/distinct-property-filter/${key}`,
      { params }
    );
  }

  restrictOffer(id: number) {
    return this.http.patch<Offer>(
      `${environment.api}/post/restrict/${id}`,
      {}
    );
  }
}
