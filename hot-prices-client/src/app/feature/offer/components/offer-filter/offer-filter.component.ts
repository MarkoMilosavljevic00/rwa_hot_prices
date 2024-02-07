import { Component, Input, OnInit } from '@angular/core';
import { FilterOfferDto } from '../../models/dtos/filter-offer.dto';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';
import { Category } from 'src/app/feature/post/models/category.model';
import { TreeNode } from 'primeng/api';
import { Observable, Subscription, of, take } from 'rxjs';
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
import { Role } from 'src/app/common/enums/role.enum';
import { selectFilterOffer } from '../../state/offer.selector';

@Component({
  selector: 'app-offer-filter',
  templateUrl: './offer-filter.component.html',
  styleUrls: ['./offer-filter.component.css'],
})
export class OfferFilterComponent implements OnInit {
  @Input() sidenavControl: MatSidenav;
  @Input() isUserPosts: boolean;

  filterSubscription: Subscription;
  userSubscription: Subscription;

  filterOffer: FilterOffer;

  user?: User;

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
    private offerService: OfferService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initValues();
    this.setUserFilter();

    this.filterSubscription = this.store
      .select(selectFilterOffer)
      .subscribe((filterOffer) => {
        if (filterOffer?.selectedCategory)
          this.selectedTreeNode =
            this.categoryService.convertCategoryToTreeNode(
              filterOffer.selectedCategory
            );
        this.filterOffer = {
          ...filterOffer,
        };
      });
  }

  setUserFilter() {
    this.userSubscription = this.store
      .select(selectCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user!;
        if (this.isUserPosts)
          this.store.dispatch(
            changeOfferFilter({ filterOffer: { ownerId: user!.id } })
          );
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.filterSubscription?.unsubscribe();
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

  onShowRestrictedChanged(showRestricted: boolean) {
    this.filterOffer.restricted = showRestricted;
  }

  isAdmin(): boolean {
    return (!!this.user && this.user.role === Role.ADMIN);
  }

  applyFilter() {
    this.sidenavControl.toggle();
    console.log(this.filterOffer);
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
