import { Component, Input } from '@angular/core';
import { calculateDiscount, formatPostTime } from 'src/app/common/helpers/helpers';
import { Offer } from '../../models/offer.model';


@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent {
  @Input() offer!: Offer;

  calculateDiscount = calculateDiscount;
}
