import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon.model';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent  implements OnInit {
  coupons: Coupon[];
  onePageCoupons: Coupon[] = [];

  page = 0;
  size = 5;

  ngOnInit() {
    this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  getData(obj: any) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.onePageCoupons = this.coupons.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
