import { Component, Input, OnInit } from '@angular/core';
import { FilterOfferDto } from '../../models/dtos/filter-offer.dto';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';
import { Category } from 'src/app/feature/post/models/category.model';
import { TreeNode } from 'primeng/api';
import { Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCategoriesList } from 'src/app/feature/post/state/category/category.selector';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { loadCategories } from 'src/app/feature/post/state/category/category.action';
import { KEYS, LIMITS, STYLE } from 'src/app/common/constants';
import { User } from 'src/app/feature/user/models/user.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { OfferService } from '../../services/offer.service';
import { SortBy, SortType } from 'src/app/common/enums/sort.enum';
import { UserService } from 'src/app/feature/user/service/user.service';
import { changeOfferFilter, clearOfferFilter } from '../../state/offer.action';
import { FilterOffer } from 'src/app/feature/offer/models/offer.filter';
import { selectCurrentReaction } from 'src/app/feature/reaction/state/reaction.selector';
import { selectCurrentRoute, selectUrl } from 'src/app/state/app.selectors';
import {
  selectCurrentUser,
  selectCurrentUserId,
} from 'src/app/feature/user/state/user.selector';

@Component({
  selector: 'app-offer-filter',
  templateUrl: './offer-filter.component.html',
  styleUrls: ['./offer-filter.component.css'],
})
export class OfferFilterComponent implements OnInit {
  @Input() sidenavControl: MatSidenav;
  @Input() isUserPosts: boolean;
  filterOffer: FilterOffer;

  // availableValues: InitialValues;
  // categoriesOption$: Observable<TreeNode<Category>[]>;
  // storesOption$: Observable<string[]>;
  // locationsOption$: Observable<string[]>;

  categoriesOptions: TreeNode<Category>[];
  users: User[];
  filteredUsersSuggestions: User[];
  storesOptions: string[];
  locationsOptions: string[];
  saleTypesOptions: SaleType[];
  sortByOptions: SortBy[];
  sortTypesOptions: SortType[];

  // isPricingEnabled = false;
  selectedTreeNode: TreeNode<Category>;
  // isDiscountEnabled = false;
  // selectedUser?: User;

  DROPDOWN_STYLE = STYLE.FULL_WIDTH;

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService,
    private offerService: OfferService,
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
        this.store.dispatch(changeOfferFilter({ filterOffer: { ownerId: userId } }));
      });
  }

  initValues() {
    this.filterOffer = new FilterOfferDto();
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
    this.offerService
      .getOfferDistinctProperty(KEYS.OFFER.STORE)
      .subscribe((stores) => (this.storesOptions = stores));
    this.offerService
      .getOfferDistinctProperty(KEYS.OFFER.LOCATION)
      .subscribe((locations) => (this.locationsOptions = locations));
  }

  onCategoryChanged(selectedTreeNode: TreeNode<Category>) {
    this.filterOffer.categoryId = selectedTreeNode
      ? selectedTreeNode.data?.id
      : undefined;
    if (selectedTreeNode)
      this.filterOffer.selectedCategory = selectedTreeNode.data;
    else this.filterOffer.selectedCategory = undefined;
    this.selectedTreeNode = selectedTreeNode;
  }

  filterOwner(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.filteredUsersSuggestions = this.users.filter((owner) =>
      owner.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  onOwnerChanged(user: User) {
    this.filterOffer.ownerId = user ? user.id : undefined;
    this.filterOffer.selectedUser = user;
  }

  onPricingChanged(isPricingEnabled: boolean) {
    this.filterOffer.isPricingEnabled = isPricingEnabled;
    if (!isPricingEnabled) {
      this.filterOffer.minPrice = undefined;
      this.filterOffer.maxPrice = undefined;
    } else {
      this.filterOffer.minPrice = LIMITS.OFFER.MIN_PRICE;
      this.filterOffer.maxPrice = LIMITS.OFFER.MAX_PRICE;
    }
  }

  onDiscountChanged(isDiscountEnabled: boolean) {
    this.filterOffer.isDiscountEnabled = isDiscountEnabled;
    if (!isDiscountEnabled) {
      this.filterOffer.minDiscount = undefined;
      this.filterOffer.maxDiscount = undefined;
    } else {
      this.filterOffer.minDiscount = LIMITS.OFFER.MIN_PRICE;
      this.filterOffer.maxDiscount = LIMITS.OFFER.MAX_PRICE;
    }
  }

  onShowExpiredChanged(showExpired: boolean) {
    this.filterOffer.expired = showExpired;
  }

  applyFilter() {
    this.sidenavControl.toggle();
    this.store.dispatch(
      changeOfferFilter({
        filterOffer: {
          ...this.filterOffer,
          title: undefined,
        },
      })
    );
  }
}
