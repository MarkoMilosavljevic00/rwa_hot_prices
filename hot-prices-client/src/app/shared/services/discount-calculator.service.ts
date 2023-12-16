import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountCalculatorService {

  constructor() { }

  calculateDiscount(oldPrice: number, newPrice: number): number {
    return ((oldPrice - newPrice) / oldPrice) * 100;
  }

  calculatePrice(oldPrice: number, discount: number): number {
    return oldPrice - (oldPrice * (discount / 100));
  }

  calculateOldPrice(newPrice: number, discount: number): number {
    return newPrice / (1 - (discount / 100));
  }
}
