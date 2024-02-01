import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterCoupon } from '../../models/coupon.filter';
import { Category } from 'src/app/feature/post/models/category.model';
import { TreeNode } from 'primeng/api';
import { User } from 'src/app/feature/user/models/user.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { SortBy, SortType } from 'src/app/common/enums/sort.enum';
import { KEYS, LIMITS, STYLE } from 'src/app/common/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { CouponService } from '../../services/coupon.service';
import { UserService } from 'src/app/feature/user/service/user.service';
import { selectCurrentUserId } from 'src/app/feature/user/state/user.selector';
import { changeFilter } from 'src/app/feature/offer/state/offer.action';
import { take } from 'rxjs';
import { changeCouponFilter } from '../../state/coupon.action';
import { FilterCouponDto } from '../../models/dtos/filter-coupon.dto';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-coupon-filter',
  templateUrl: './coupon-filter.component.html',
  styleUrls: ['./coupon-filter.component.css']
})
export class CouponFilterComponent {
  @Input() sidenavControl: MatSidenav;
  @Input() isUserPosts: boolean;
  filterCoupon: FilterCoupon;

  categoriesOptions: TreeNode<Category>[];
  users: User[];
  filteredUsersSuggestions: User[];
  storesOptions: string[];
  locationsOptions: string[];
  saleTypesOptions: SaleType[];
  sortByOptions: SortBy[];
  sortTypesOptions: SortType[];

  selectedTreeNode: TreeNode<Category>;

  DROPDOWN_STYLE = STYLE.FULL_WIDTH;

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService,
    private couponService: CouponService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initValues();
    if (this.isUserPosts) {
      this.setUserFilter();
    }
  }


  setUserFilter() {
    this.store
      .select(selectCurrentUserId)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(changeCouponFilter({ filterCoupon: { ownerId: userId } }));
      });
  }

  initValues() {
    this.filterCoupon = new FilterCouponDto();
    this.saleTypesOptions = Object.values(SaleType);
    this.sortByOptions = Object.values(SortBy);
    this.sortTypesOptions = Object.values(SortType);

    if (!this.isUserPosts) {
      this.userService.getUsers().subscribe((users) => (this.users = users));
    }

    this.categoryService
      .getAllCategoriesAsTreeNodes()
      .subscribe((categories) => {
        this.categoriesOptions = categories;
      });
    this.couponService
      .getCouponsDistinctProperty(KEYS.OFFER.STORE)
      .subscribe((stores) => (this.storesOptions = stores));
    this.couponService
      .getCouponsDistinctProperty(KEYS.OFFER.LOCATION)
      .subscribe((locations) => (this.locationsOptions = locations));
  }

  onCategoryChanged(selectedTreeNode: TreeNode<Category>) {
    this.filterCoupon.categoryId = selectedTreeNode
      ? selectedTreeNode.data?.id
      : undefined;
    if (selectedTreeNode)
      this.filterCoupon.selectedCategory = selectedTreeNode.data;
    else this.filterCoupon.selectedCategory = undefined;
    this.selectedTreeNode = selectedTreeNode;
  }

  filterOwner(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.filteredUsersSuggestions = this.users.filter((owner) =>
      owner.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  onOwnerChanged(user: User) {
    this.filterCoupon.ownerId = user ? user.id : undefined;
    this.filterCoupon.selectedUser = user;
  }

  onDiscountChanged(isDiscountEnabled: boolean) {
    this.filterCoupon.isDiscountEnabled = isDiscountEnabled;
    if (!isDiscountEnabled) {
      this.filterCoupon.minDiscount = undefined;
      this.filterCoupon.maxDiscount = undefined;
    } else {
      this.filterCoupon.minDiscount = LIMITS.OFFER.MIN_PRICE;
      this.filterCoupon.maxDiscount = LIMITS.OFFER.MAX_PRICE;
    }
  }

  onShowExpiredChanged(showExpired: boolean) {
    this.filterCoupon.expired = showExpired;
  }

  applyFilter() {
    this.sidenavControl.toggle();
    this.store.dispatch(
      changeCouponFilter({
        filterCoupon: {
          ...this.filterCoupon,
          title: undefined,
        },
      })
    );
  }
}
