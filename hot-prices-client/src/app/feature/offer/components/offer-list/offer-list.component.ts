import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription, skip } from 'rxjs';
import {
  changePaginationFilter,
  changeSearchFilter,
  clearFilter,
  loadOffers,
  loadTitles,
} from '../../state/offer.action';
import {
  selectFilterOffer,
  selectLengthOfOffers,
  selectOffersList,
} from '../../state/offer.selector';
import { DEFAULT, PAGE } from 'src/app/common/constants';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { FilterOfferDto } from '../../models/dtos/filter-offer.dto';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  onePageOffers: Offer[] = [];

  offer$: Observable<Offer[]>;
  length$: Observable<number>;
  filter$: Observable<FilterOfferDto>;

  pagination: Pagination = {
    pageIndex: PAGE.INITIAL_INDEX,
    pageSize: PAGE.SIZE,
  };

  filterSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(
      changePaginationFilter({ pagination: this.pagination })
    );
    this.filterSubscription = this.store
      .select(selectFilterOffer)
      .subscribe((filter) => {
        console.log('loadujem offere');
        this.store.dispatch(loadOffers({ filterOfferDto: filter ? filter : { }}));
      });
    this.offer$ = this.store.select(selectOffersList);
    this.length$ = this.store.select(selectLengthOfOffers);
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  // private loadOffers() {
  //   this.offerService.getOffers().subscribe((offers) => {
  //     this.offers = offers;
  //     this.offers.forEach((offer) => {
  //       offer.postedDate = new Date(offer.postedDate);
  //       if (offer.expiryDate) {
  //         offer.expiryDate = new Date(offer.expiryDate);
  //       }
  //     });
  //     this.getData({ pageIndex: this.pageIndex, pageSize: this.pageSize });
  //   });
  // }

  getData(pagination: Pagination) {
    // const filterOfferDto: FilterOfferDto = { ...pagination };
    // this.store.dispatch(changeSearch({ filterOfferDto }));
    this.store.dispatch(changePaginationFilter({ pagination }));
  }
}
