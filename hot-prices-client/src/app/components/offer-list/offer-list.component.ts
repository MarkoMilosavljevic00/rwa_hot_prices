import { Component, OnInit } from '@angular/core';
import { OfferType } from 'src/app/enums/offer-type.enum';
import { PostStatus } from 'src/app/enums/post-status.enum';
import { Offer } from 'src/app/models/offer';
import { OFFERS } from './offer.model';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = OFFERS
  onePageOffers: Offer[] = [];

  page = 0;
  size = 5;

  ngOnInit() {
    this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  getData(obj: any) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.onePageOffers = this.offers.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
