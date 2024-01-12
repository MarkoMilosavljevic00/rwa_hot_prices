import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';
import { OfferCreateDto } from '../models/offer-create.dto';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private readonly http: HttpClient) { }

  getOfferById(id: number) {
    return this.http.get<Offer>(`${environment.api}/offers/${id}`);
  }

  getOffers(){
    return this.http.get<Offer[]>(`${environment.api}/offers`);
  }

  postOffer(offer: OfferCreateDto) {
    return this.http.post<OfferCreateDto>(`${environment.api}/offers`, offer);
  }
}
