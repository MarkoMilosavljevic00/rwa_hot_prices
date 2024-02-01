import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterConversation } from '../../models/conversation.filter';
import { TreeNode } from 'primeng/api';
import { Category } from 'src/app/feature/post/models/category.model';
import { User } from 'src/app/feature/user/models/user.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { SortBy, SortType } from 'src/app/common/enums/sort.enum';
import { KEYS, STYLE } from 'src/app/common/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { OfferService } from 'src/app/feature/offer/services/offer.service';
import { UserService } from 'src/app/feature/user/service/user.service';
import { selectCurrentUserId } from 'src/app/feature/user/state/user.selector';
import { take } from 'rxjs';
import { changeConversationFilter } from '../../state/conversation.action';
import { FilterConversationDto } from '../../models/dtos/filter-conversation.dto';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-conversation-filter',
  templateUrl: './conversation-filter.component.html',
  styleUrls: ['./conversation-filter.component.css']
})
export class ConversationFilterComponent {
  @Input() sidenavControl: MatSidenav;
  @Input() isUserPosts: boolean;
  filterOffer: FilterConversation;

  categoriesOptions: TreeNode<Category>[];
  users: User[];
  filteredUsersSuggestions: User[];
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
    if (this.isUserPosts) {
      this.setUserFilter();
    }
  }

  setUserFilter() {
    this.store
      .select(selectCurrentUserId)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(changeConversationFilter({ filterConversation: { ownerId: userId } }));
      });
  }

  initValues() {
    this.filterOffer = new FilterConversationDto();
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


  applyFilter() {
    this.sidenavControl.toggle();
    this.store.dispatch(
      changeConversationFilter({
        filterConversation: {
          ...this.filterOffer,
          title: undefined,
        },
      })
    );
  }
}
