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
import { selectCurrentUser, selectCurrentUserId } from 'src/app/feature/user/state/user.selector';
import { Subscription, take } from 'rxjs';
import { changeConversationFilter } from '../../state/conversation.action';
import { FilterConversationDto } from '../../models/dtos/filter-conversation.dto';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { selectFilterConversation } from '../../state/conversation.selector';

@Component({
  selector: 'app-conversation-filter',
  templateUrl: './conversation-filter.component.html',
  styleUrls: ['./conversation-filter.component.css']
})
export class ConversationFilterComponent {
  @Input() sidenavControl: MatSidenav;
  @Input() isUserPosts: boolean;
  filterConversation: FilterConversation;

  user: User;

  filterSubscription: Subscription;
  userSubscription: Subscription;

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
    this.setUserFilter();

    this.filterSubscription = this.store
      .select(selectFilterConversation)
      .subscribe((filterConversation) => {
        if (filterConversation?.selectedCategory)
          this.selectedTreeNode =
            this.categoryService.convertCategoryToTreeNode(
              filterConversation.selectedCategory
            );
        this.filterConversation = {
          ...filterConversation,
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
            changeConversationFilter({ filterConversation: { ownerId: user!.id } })
          );
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.filterSubscription?.unsubscribe();
  }

  initValues() {
    this.filterConversation = new FilterConversationDto();
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
    this.filterConversation.categoryId = selectedTreeNode
      ? selectedTreeNode.data?.id
      : undefined;
    if (selectedTreeNode)
      this.filterConversation.selectedCategory = selectedTreeNode.data;
    else this.filterConversation.selectedCategory = undefined;
    this.selectedTreeNode = selectedTreeNode;
  }

  filterOwner(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.filteredUsersSuggestions = this.users.filter((owner) =>
      owner.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  onOwnerChanged(user: User) {
    this.filterConversation.ownerId = user ? user.id : undefined;
    this.filterConversation.selectedUser = user;
  }


  applyFilter() {
    this.sidenavControl.toggle();
    this.store.dispatch(
      changeConversationFilter({
        filterConversation: {
          ...this.filterConversation,
          title: undefined,
        },
      })
    );
  }
}
