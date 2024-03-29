import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon.model';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { PAGE } from 'src/app/common/constants';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { FilterCouponDto } from '../../models/dtos/filter-coupon.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { changeCouponPaginationFilter, loadCoupons, loadCouponsAdmin } from '../../state/coupon.action';
import { selectCouponsList, selectFilterCoupon, selectLengthOfCoupon } from '../../state/coupon.selector';
import { selectCurrentUser } from 'src/app/feature/user/state/user.selector';
import { Role } from 'src/app/common/enums/role.enum';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent  implements OnInit {
  coupon$: Observable<Coupon[]>;
  length$: Observable<number>;
  filter$: Observable<FilterCouponDto>;

  pagination: Pagination = {
    pageIndex: PAGE.INITIAL_INDEX,
    pageSize: PAGE.SIZE,
  };

  filterSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(
      changeCouponPaginationFilter({ pagination: this.pagination })
    );
    this.filterSubscription = combineLatest([
      this.store.select(selectFilterCoupon),
      this.store.select(selectCurrentUser)
    ]).subscribe(([filter, user]) => {
      if (user && user.role === Role.ADMIN) {
        this.store.dispatch(loadCouponsAdmin({ filterCouponDto: filter ? filter : {} }));
      } else {
        this.store.dispatch(loadCoupons({ filterCouponDto: filter ? filter : {} }));
      }
    });
    this.coupon$ = this.store.select(selectCouponsList);
    this.length$ = this.store.select(selectLengthOfCoupon);
  }

  getData(pagination: Pagination) {
    this.store.dispatch(changeCouponPaginationFilter({ pagination }));
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }
}
