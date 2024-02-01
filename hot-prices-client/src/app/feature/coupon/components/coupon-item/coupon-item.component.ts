import { Component, Input } from '@angular/core';
import { Coupon } from '../../models/coupon.model';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { ImageType } from 'src/app/common/enums/image-type.enum';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})
export class CouponItemComponent {
  @Input() coupon!: Coupon;

  setFirstImage() {
    if (this.coupon && this.coupon.imgPaths?.length > 0) {
      return `${IMAGES_URL}/${ImageType.POST_IMAGE}/${this.coupon.imgPaths[0]}`;
    } else {
      return DEFAULT.POST.IMAGE;
    }
  }
}