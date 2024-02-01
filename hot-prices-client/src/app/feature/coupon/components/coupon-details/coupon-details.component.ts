import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostStatus } from 'src/app/common/enums/post-status.enum';
import { Coupon } from '../../models/coupon.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Subscription, filter, skip, switchMap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { clearDetailedCoupon, loadDetailedCoupon } from '../../state/coupon.action';
import { selectDetailedCoupon } from '../../state/coupon.selector';
import { Category } from 'src/app/feature/post/models/category.model';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { ImageType } from 'src/app/common/enums/image-type.enum';

export interface ImageInfo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
}

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {
  coupon?: Coupon;
  couponSubscription: Subscription;

  galleryImages?: ImageInfo[];
  discountsDataSource: MatTableDataSource<
    { key: string; value: number },
    MatTableDataSourcePaginator
  >;
  categoryMenuItems: MenuItem[];
  homeMenuItem: MenuItem = { icon: 'pi pi-home', routerLink: '/posts/coupons' };

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.couponSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((couponId) => {
          if (couponId) {
            this.store.dispatch(loadDetailedCoupon({ id: +couponId }));
          }
          return this.store.select(selectDetailedCoupon);
        }),
        skip(1)
      )
      .subscribe((coupon) => {
        if (coupon) {
          this.coupon = {...coupon};
          console.log(this.coupon);
          this.setGalleryImages(coupon.imgPaths);
          this.setDiscountsDataSource(coupon.discounts);
          this.convertCategoryToMenuItems(coupon.category);
        }
      });
  }

  convertCategoryToMenuItems(category: Category) {
    this.categoryMenuItems =
      this.categoryService.convertCategoryToMenuItems(category);
  }

  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe();
    this.store.dispatch(clearDetailedCoupon());
  }

  setDiscountsDataSource(discounts: Record<string, number> | undefined) {
    if (!this.isDiscountsEmpty(discounts)) {
      this.discountsDataSource = new MatTableDataSource(
        Object.entries(discounts!).map(([key, value]) => ({
          key,
          value,
        }))
      );
    }
  }

  isDiscountsEmpty(
    discounts: Record<string, number> | undefined
  ): boolean {
    return !discounts || Object.keys(discounts).length === 0;
  }

  setGalleryImages(imgPaths: string[]) {
    if (imgPaths && imgPaths.length > 0) {
      this.galleryImages = imgPaths.map((imgPath) => {
        console.log()
        return {
          itemImageSrc: `${IMAGES_URL}/${ImageType.POST_IMAGE}/${imgPath}`,
          thumbnailImageSrc: `${IMAGES_URL}/${ImageType.POST_IMAGE}/${imgPath}`,
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
    return this.coupon?.saleType === SaleType.Online;
  }
}
