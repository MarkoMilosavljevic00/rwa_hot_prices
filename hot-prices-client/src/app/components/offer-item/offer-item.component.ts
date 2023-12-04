import { Component, Input } from '@angular/core';
import { Offer } from 'src/app/models/offer';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent {
  @Input() offer!: Offer;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  calculateDiscount(): number {
    if(this.offer.oldPrice) {
      const discount = ((this.offer.oldPrice - this.offer.price) / this.offer.oldPrice) * 100;
      return Math.round(discount);
    }
    else return 0;
  }
}
