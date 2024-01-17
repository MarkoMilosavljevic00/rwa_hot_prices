import { Component, OnInit } from '@angular/core';
import { FormRecord } from '@angular/forms';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { OFFERS } from '../../services/offer.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { DEFAULT } from 'src/app/common/constants';
import { FileService } from 'src/app/shared/services/file.service';

export interface ImageInfo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
}

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  offer?: Offer;
  
  images?: ImageInfo[];
  specsDataSource: MatTableDataSource<
    { key: string; value: string },
    MatTableDataSourcePaginator
  >;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private fileService: FileService,
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.offerService.getById(id).subscribe((offer) => {
      this.offer = offer;
      this.offer.postedDate = new Date(this.offer.postedDate);
      if (this.offer.expiryDate) {
        this.offer.expiryDate = new Date(this.offer.expiryDate);
      }
      this.getImagesInfos();

      if (this.offer.specifications) {
        this.specsDataSource = new MatTableDataSource(
          Object.entries(this.offer?.specifications).map(([key, value]) => ({
            key,
            value,
          }))
        );
      }
    });
    // if (this.offer && this.offer?.specifications) {
    //   this.dataSource = new MatTableDataSource(
    //     Object.entries(this.offer?.specifications).map(([key, value]) => ({
    //       key,
    //       value,
    //     }))
    //   );
    // }
    // this.images =
    //   this.offer?.imgPaths.map((imgPath) => {
    //     return {
    //       itemImageSrc: imgPath,
    //       thumbnailImageSrc: imgPath,
    //     };
    //   }) || [];
    // this.specifications = this.offer?.specifications || {};
    // if (this.offer && this.offer?.specifications){
    //   this.dataSource = new MatTableDataSource(
    //     Object.entries(this.offer?.specifications).map(([key, value]) => ({
    //       key,
    //       value,
    //     }))
    //   );
    // }
    // this.route.params.subscribe((params: Params) => {
    //   this.offer = OFFERS.find((offer) => offer.id === +params['id']);
    //   this.images =
    //     this.offer?.imgPaths.map((imgPath) => {
    //       return {
    //         itemImageSrc: imgPath,
    //         thumbnailImageSrc: imgPath,
    //       };
    //     }) || [];
    //   this.specifications = this.offer?.specifications || {};
    //   this.dataSource = new MatTableDataSource(
    //     Object.entries(this.specifications).map(([key, value]) => ({
    //       key,
    //       value,
    //     }))
    //   );
    // });
  }

  getImagesInfos() {
    this.images = this.offer!.imgPaths
      ? this.offer!.imgPaths.map((imgPath) => {
          return {
            itemImageSrc: this.fileService.GET_IMAGE_URL + imgPath,
            thumbnailImageSrc: this.fileService.GET_IMAGE_URL + imgPath,
          };
        })
      : [
          {
            itemImageSrc: DEFAULT.OFFER.IMAGE,
            thumbnailImageSrc: DEFAULT.OFFER.IMAGE,
          },
        ];
  }

  isOnline(): boolean {
    return this.offer?.saleType === SaleType.Online;
  }
}
