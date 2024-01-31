import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { CONVERSATIONS } from '../../services/conversations.model';
import { Observable, Subscription } from 'rxjs';
import { FilterConversationDto } from '../../models/dtos/filter-conversation.dto';
import { Pagination } from 'src/app/common/interfaces/pagination.interface';
import { PAGE } from 'src/app/common/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectConversationsList, selectLengthOfConversation } from '../../state/conversation.selector';
import { loadConversations } from '../../state/conversation.action';

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
    // this.store.dispatch(
    //   changePaginationFilter({ pagination: this.pagination })
    // );
    // this.filterSubscription = this.store
    //   .select(selectFilterOffer)
    //   .subscribe((filter) => {
    //     console.log('loadujem offere');
    //     this.store.dispatch(loadOffers({ filterOfferDto: filter ? filter : { }}));
    //   });
    this.store.dispatch(loadConversations({ filterConversationDto: {}}));
    this.conversation$ = this.store.select(selectConversationsList);
    this.length$ = this.store.select(selectLengthOfConversation);
  }

  ngOnDestroy() {
    // this.filterSubscription.unsubscribe();
  }

  // private loadOffers() {
  //   this.offerService.getOffers().subscribe((offers) => {
  //     this.offers = offers;
  //     this.offers.forEach((offer) => {
  //       offer.postedDate = new Date(offer.postedDate);
  //       if (offer.expiryDate) {
  //         offer.expiryDate = new Date(offer.expiryDate);
  //       }
  //     });
  //     this.getData({ pageIndex: this.pageIndex, pageSize: this.pageSize });
  //   });
  // }

  getData(pagination: Pagination) {
    // const filterOfferDto: FilterOfferDto = { ...pagination };
    // this.store.dispatch(changeSearch({ filterOfferDto }));
    // this.store.dispatch(changePaginationFilter({ pagination }));
  }
}