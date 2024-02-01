import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter, skip } from 'rxjs';
import {
  changeOfferPaginationFilter,
  changeOfferSearchFilter,
  clearOfferFilter,
  loadOffers,
  loadOfferTitles,
} from '../../state/offer.action';
import {
  selectFilterOffer,
  selectLengthOfOffers,
  selectOffersList,
} from '../../state/offer.selector';
import { DEFAULT, PAGE } from 'src/app/common/constants';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { FilterOfferDto } from '../../models/dtos/filter-offer.dto';
import { isNotUndefined } from 'src/app/common/type-guards';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements OnInit, OnDestroy {
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
      changeOfferPaginationFilter({ pagination: this.pagination })
    );
    this.filterSubscription = this.store
      .select(selectFilterOffer)
      .subscribe((filter) => {
        this.store.dispatch(
          loadOffers({ filterOfferDto: filter ? filter : {} })
        );
      });
    this.offer$ = this.store.select(selectOffersList);
    this.length$ = this.store.select(selectLengthOfOffers);
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  getData(pagination: Pagination) {
    this.store.dispatch(changeOfferPaginationFilter({ pagination }));
  }
}
