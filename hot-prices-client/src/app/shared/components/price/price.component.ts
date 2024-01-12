import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  @Input() price: number;
  @Input() oldPrice?: number;
  @Input() discount?: number;

  @Input() multipleDiscounts: boolean = false;
  @Input() align: 'center' | 'start' = 'center';
}