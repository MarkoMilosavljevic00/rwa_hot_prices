import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OFFERS } from '../../services/offer.model';
import { OfferService } from '../../services/offer.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadOffers } from '../../state/offer.action';
import { selectOffersList } from '../../state/offer.selector';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = [];
  onePageOffers: Offer[] = [];

  offer$: Observable<Offer[]>;

  page = 0;
  size = 3;

  constructor(
    private offerService: OfferService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadOffers());
    this.offer$ = this.store.select(selectOffersList)
    // .subscribe((offers) => {
    //   console.log(offers)
    // });
    // this.loadOffers();
  }

  private loadOffers() {
    this.offerService.get().subscribe((offers) => {
      this.offers = offers;
      this.offers.forEach((offer) => {
        offer.postedDate = new Date(offer.postedDate);
        if (offer.expiryDate) {
          offer.expiryDate = new Date(offer.expiryDate);
        }
      });
      this.getData({ pageIndex: this.page, pageSize: this.size });
    });
  }

  getData(obj: { pageIndex: number; pageSize: number }) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.onePageOffers = this.offers.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
