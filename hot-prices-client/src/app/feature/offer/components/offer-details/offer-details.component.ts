import { Component, OnInit } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { OFFERS } from '../../services/offer.model';
import { calculateDiscount, formatPostTime } from 'src/app/common/helpers/helpers';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Offer } from '../../models/offer.model';

export interface ImageInfo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
}

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer?: Offer;
  images: any[] | undefined;

  displayedColumns: string[] = ['specName', 'specValue'];
  dataSource: any;
  specifications: Record<string, string> = {};
  calculateDiscount = calculateDiscount;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.offer = OFFERS.find(offer => offer.id === +this.route.snapshot.params['id']);
    this.images = this.offer?.imgPaths.map(imgPath => {
      return {
        itemImageSrc: imgPath,
        thumbnailImageSrc: imgPath,
      }
    }) || [];
    this.specifications = this.offer?.specifications || {};
    this.dataSource = new MatTableDataSource(Object.entries(this.specifications).map(([key, value]) => ({ key, value })));
    this.route.params
      .subscribe((params: Params) => {
        this.offer = OFFERS.find(offer => offer.id === +params['id'])
        this.images = this.offer?.imgPaths.map(imgPath => {
          return {
            itemImageSrc: imgPath,
            thumbnailImageSrc: imgPath,
          }
        }) || [];
        this.specifications = this.offer?.specifications || {};
        this.dataSource = new MatTableDataSource(Object.entries(this.specifications).map(([key, value]) => ({ key, value })));
      });
  }

  isOnline(): boolean {
    return this.offer?.type === SaleType.Online;
  }
}
