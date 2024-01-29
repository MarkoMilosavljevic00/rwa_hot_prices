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
import { changeFilter, clearFilter } from '../../state/offer.action';
import { selectFilterOffer } from '../../state/offer.selector';
import { FilterOffer } from 'src/app/common/interfaces/filter-offer.interface';
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
    // this.store.select(selectFilterOffer).subscribe((filterOffer) => {
    //   if (filterOffer.selectedCategory)
    //     this.selectedTreeNode = this.categoryService.convertCategoryToTreeNode(
    //       filterOffer.selectedCategory
    //     );
    //   this.filterOffer = {
    //     ...filterOffer,
    //   };
    // });
  }


  setUserFilter() {
    this.store
      .select(selectCurrentUserId)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(changeFilter({ filterOffer: { ownerId: userId } }));
      });
  }

  // patchValues(filterOffer: FilterOfferDto) {
  //   if(filterOffer.categoryId){
  //     console.log(filterOffer.categoryId);
  //     this.selectedCategory = this.categoriesOptions.find(category => category.data?.id === filterOffer.categoryId);
  //   }
  //   if(filterOffer.ownerId){
  //     this.selectedUser = this.users.find(user => user.id === filterOffer.ownerId);
  //   }
  //   this.isPricingEnabled = filterOffer.minPrice != undefined || filterOffer.maxPrice != undefined;
  //   this.isDiscountEnabled = filterOffer.minDiscount != undefined || filterOffer.maxDiscount != undefined;
  // }

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
    // this.store
    //   .select(selectInitialValues)
    //   .subscribe(
    //     (initialValues) => (this.availableValues = { ...initialValues })
    //   );
    // this.store.select(selectInitialValues).subscribe((initialValues) => {
    //   let categories: TreeNode<Category>[] | Category[] = [];
    //   if (initialValues.categories) {
    //     categories = initialValues.categories.map((category) =>
    //       this.categoryService.convertCategoryToTreeNode(category as Category)
    //     );
    //   }
    //   this.availableValues = { ...initialValues, categories };
    // });
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
    // if (this.availableValues.users) {
    //   this.filteredUsersSuggestions = this.availableValues.users.filter(
    //     (owner) => owner.username.toLowerCase().includes(query.toLowerCase())
    //   );
    // }
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
      changeFilter({
        filterOffer: {
          ...this.filterOffer,
          title: undefined,
        },
      })
    );
  }
}
