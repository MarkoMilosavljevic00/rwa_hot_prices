import { Component, Input } from '@angular/core';
import { Offer } from 'src/app/feature/post/models/offer';


@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent {
  @Input() offer!: Offer;

  calculateDiscount(): number {
    if(this.offer.oldPrice) {
      const discount = ((this.offer.oldPrice - this.offer.price) / this.offer.oldPrice) * 100;
      return Math.round(discount);
    }
    else return 0;
  }
}
