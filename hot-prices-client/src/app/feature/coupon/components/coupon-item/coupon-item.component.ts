import { Component, Input } from '@angular/core';
import { Coupon } from '../../models/coupon.model';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})
export class CouponItemComponent {
  @Input() coupon!: Coupon;
}