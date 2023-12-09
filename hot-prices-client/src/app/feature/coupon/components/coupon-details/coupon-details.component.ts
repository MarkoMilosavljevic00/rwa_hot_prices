import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostStatus } from 'src/app/common/enums/post-status.enum';
import { Coupon } from '../../models/coupon.model';
import { COUPONS } from '../coupon-list/coupons';

export interface ImageInfo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
}

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {
  coupon?: Coupon;
  images: any[] | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.coupon = COUPONS.find(coupon => coupon.id === +this.route.snapshot.params['id']);
    this.images = this.coupon?.imgPaths.map(imgPath => {
      return {
        itemImageSrc: imgPath,
        thumbnailImageSrc: imgPath,
      }
    }) || [];
    this.route.params
      .subscribe((params: Params) => {
        this.coupon = COUPONS.find(coupon => coupon.id === +params['id'])
        this.images = this.coupon?.imgPaths.map(imgPath => {
          return {
            itemImageSrc: imgPath,
            thumbnailImageSrc: imgPath,
          }
        }) || [];
      });
  }

  isExpired(){
    return this.coupon?.status === PostStatus.Expired
  }
}
