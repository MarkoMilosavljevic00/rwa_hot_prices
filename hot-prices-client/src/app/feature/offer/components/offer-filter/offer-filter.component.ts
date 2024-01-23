import { Component, Input, OnInit } from '@angular/core';
import { FilterOfferDto } from '../../models/dtos/filter-offer.dto';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';
import { Category } from 'src/app/feature/post/models/category.model';
import { TreeNode } from 'primeng/api';
import { Observable, of } from 'rxjs';
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
import { changeFilter } from '../../state/offer.action';

@Component({
  selector: 'app-offer-filter',
  templateUrl: './offer-filter.component.html',
  styleUrls: ['./offer-filter.component.css'],
})
export class OfferFilterComponent implements OnInit {
  @Input() sidenavControl: MatSidenav;
  filterOffer: FilterOfferDto;

  isPricingEnabled = false;
  isDiscountEnabled = false;

  categoriesOption$: Observable<TreeNode<Category>[]>;
  storesOption$: Observable<string[]>;
  locationsOption$: Observable<string[]>;

  users: User[];
  filteredUsersSuggestions: User[];
  saleTypesOptions: SaleType[];
  sortByOptions: SortBy[];
  sortTypesOptions: SortType[];
  
  selectedCategory: TreeNode<Category>;
  selectedUser: User;

  DROPDOWN_STYLE = STYLE.FULL_WIDTH;

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoryService,
    private offerService: OfferService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initValues();
  }

  initValues() {
    this.filterOffer = {};
    this.userService.getUsers().subscribe(users => this.users = users);
    this.categoriesOption$ = this.categoryService.getAllCategoriesAsTreeNodes();
    this.saleTypesOptions = Object.values(SaleType);
    this.storesOption$ = this.offerService.getOfferDistinctProperty(KEYS.OFFER.STORE);
    this.locationsOption$ = this.offerService.getOfferDistinctProperty(KEYS.OFFER.LOCATION);
    this.sortByOptions = Object.values(SortBy);
    this.sortTypesOptions = Object.values(SortType);
  }

  onCategoryChanged(selectedCategory: TreeNode<Category>) {
    this.filterOffer.categoryId = selectedCategory
      ? selectedCategory.data?.id
      : undefined;
    this.selectedCategory = selectedCategory;
  }

  filterOwner(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.filteredUsersSuggestions = this.users.filter((owner) =>
      owner.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  onOwnerChanged(user: User) {
    this.filterOffer.ownerId = user ? user.id : undefined;
    this.selectedUser = user;
  }

  onPricingChanged(isPricingEnabled: boolean) {
    this.isPricingEnabled = isPricingEnabled;
    if (!isPricingEnabled) {
      this.filterOffer.minPrice = undefined;
      this.filterOffer.maxPrice = undefined;
    } else {
      this.filterOffer.minPrice = LIMITS.OFFER.MIN_PRICE;
      this.filterOffer.maxPrice = LIMITS.OFFER.MAX_PRICE;
    }
  }

  onDiscountChanged(isDiscountEnabled: boolean) {
    this.isDiscountEnabled = isDiscountEnabled;
    if (!isDiscountEnabled) {
      this.filterOffer.minDiscount = undefined;
      this.filterOffer.maxDiscount = undefined;
    } else {
      this.filterOffer.minDiscount = LIMITS.OFFER.MIN_PRICE;
      this.filterOffer.maxDiscount = LIMITS.OFFER.MAX_PRICE;
    }
  }

  applyFilter() {
    console.log(this.filterOffer);
    this.store.dispatch(changeFilter({ filter: this.filterOffer }));
  }
}
