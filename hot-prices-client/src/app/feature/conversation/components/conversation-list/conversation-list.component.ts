import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { Observable, Subscription } from 'rxjs';
import { FilterConversationDto } from '../../models/dtos/filter-conversation.dto';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { PAGE } from 'src/app/common/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectConversationsList, selectFilterConversation, selectLengthOfConversation } from '../../state/conversation.selector';
import { changeConversationPaginationFilter, loadConversations } from '../../state/conversation.action';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversation$: Observable<Conversation[]>;
  length$: Observable<number>;
  filter$: Observable<FilterConversationDto>;

  pagination: Pagination = {
    pageIndex: PAGE.INITIAL_INDEX,
    pageSize: PAGE.SIZE,
  };

  filterSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(
      changeConversationPaginationFilter({ pagination: this.pagination })
    );
    this.filterSubscription = this.store
      .select(selectFilterConversation)
      .subscribe((filter) => {
        this.store.dispatch(loadConversations({ filterConversationDto: filter ? filter : { }}));
      });
    this.conversation$ = this.store.select(selectConversationsList);
    this.length$ = this.store.select(selectLengthOfConversation);
  }

  getData(pagination: Pagination) {
    this.store.dispatch(changeConversationPaginationFilter({ pagination }));
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }
}