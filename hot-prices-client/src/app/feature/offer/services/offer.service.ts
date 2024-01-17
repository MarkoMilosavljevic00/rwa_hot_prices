import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';
import { FormOfferDto } from '../models/dtos/create-offer.dto';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private readonly http: HttpClient) { }

  getById(id: number) {
    return this.http.get<Offer>(`${environment.api}/offers/${id}`);
  }

  get(){
    return this.http.get<Offer[]>(`${environment.api}/offers`);
  }

  post(offer: FormOfferDto) {
    return this.http.post<FormOfferDto>(`${environment.api}/offers`, offer);
  }

  update(id: number, offer: FormOfferDto) {
    return this.http.patch<FormOfferDto>(`${environment.api}/offers/${id}`, offer);
  }
}
