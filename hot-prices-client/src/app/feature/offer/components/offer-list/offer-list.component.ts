import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, skip } from 'rxjs';
import {
  changeOfferPaginationFilter,
  changeOfferSearchFilter,
  clearOfferFilter,
  loadOffers,
  loadOffersAdmin,
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
import { selectCurrentUser } from 'src/app/feature/user/state/user.selector';
import { Role } from 'src/app/common/enums/role.enum';

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
    this.filterSubscription = combineLatest([
      this.store.select(selectFilterOffer),
      this.store.select(selectCurrentUser)
    ]).subscribe(([filter, user]) => {
      if (user!.role === Role.Admin) {
        this.store.dispatch(loadOffersAdmin({ filterOfferDto: filter ? filter : {} }));
      } else {
        this.store.dispatch(loadOffers({ filterOfferDto: filter ? filter : {} }));
      }
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
