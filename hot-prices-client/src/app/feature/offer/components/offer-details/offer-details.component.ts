import { Component, OnInit } from '@angular/core';
import { FormRecord } from '@angular/forms';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer.service';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { FileService } from 'src/app/shared/services/file.service';
import {
  selectIdFromRouteParams,
  selectRouteParams,
} from 'src/app/state/app.selectors';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import {
  clearDetailedOffer,
  clearEditingOffer,
  loadDetailedOffer,
} from '../../state/offer.action';
import { Observable, Subscription, filter, map, skip, switchMap } from 'rxjs';
import { selectDetailedOffer } from '../../state/offer.selector';
import { isNotUndefined } from 'src/app/common/type-guards';
import { MenuItem } from 'primeng/api';
import { Category } from 'src/app/feature/post/models/category.model';
import { CategoryService } from 'src/app/feature/post/services/category.service';

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
  offerSubscription: Subscription;

  galleryImages?: ImageInfo[];
  specsDataSource: MatTableDataSource<
    { key: string; value: string },
    MatTableDataSourcePaginator
  >;
  categoryMenuItems: MenuItem[];
  homeMenuItem: MenuItem = { icon: 'pi pi-home', routerLink: '/posts/offers' };

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((offerId) => {
          if (offerId) {
            this.store.dispatch(loadDetailedOffer({ offerId: +offerId }));
          }
          return this.store.select(selectDetailedOffer);
        }),
        skip(1)
      )
      .subscribe((offer) => {
        if (offer) {
          this.offer = offer;
          console.log(this.offer);
          this.setGalleryImages(offer.imgPaths);
          this.setSpecsDataSource(offer.specifications);
          this.convertCategoryToMenuItems(offer.category);
        }
      });
  }

  convertCategoryToMenuItems(category: Category) {
    this.categoryMenuItems =
      this.categoryService.convertCategoryToMenuItems(category);
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
    this.store.dispatch(clearDetailedOffer());
  }

  setSpecsDataSource(specifications: Record<string, string> | undefined) {
    if (!this.isSpecificationsEmpty(specifications)) {
      this.specsDataSource = new MatTableDataSource(
        Object.entries(specifications!).map(([key, value]) => ({
          key,
          value,
        }))
      );
    }
  }

  isSpecificationsEmpty(
    specifications: Record<string, string> | undefined
  ): boolean {
    return !specifications || Object.keys(specifications).length === 0;
  }

  setGalleryImages(imgPaths: string[]) {
    if (imgPaths && imgPaths.length > 0) {
      this.galleryImages = imgPaths.map((imgPath) => {
        return {
          itemImageSrc: IMAGES_URL + '/offers/' + imgPath,
          thumbnailImageSrc: IMAGES_URL + '/offers/' + imgPath,
        };
      });
    } else {
      this.galleryImages = [
        {
          itemImageSrc: DEFAULT.POST.IMAGE,
          thumbnailImageSrc: DEFAULT.POST.IMAGE,
        },
      ];
    }
  }

  formatDate(date: Date): Date {
    return new Date(date);
  }

  isOnline(): boolean {
    return this.offer?.saleType === SaleType.Online;
  }
}
