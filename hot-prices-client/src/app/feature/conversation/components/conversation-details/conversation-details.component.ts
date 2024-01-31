import { Component, OnInit } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Conversation } from '../../models/conversation.model';
import { CONVERSATIONS } from '../../services/conversations.model';
import { Subscription, filter, skip, switchMap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { selectDetailedConversation } from '../../state/conversation.selector';
import { Category } from 'src/app/feature/post/models/category.model';
import { MenuItem } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';

export interface ImageInfo {
  itemImageSrc: string;
  thumbnailImageSrc: string;
}

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.css']
})
export class ConversationDetailsComponent implements OnInit {
  conversation: Conversation;
  conversationSubscription: Subscription;

  categoryMenuItems: MenuItem[];
  homeMenuItem: MenuItem = { icon: 'pi pi-home', routerLink: '/posts/offers' };

  constructor(private store: Store<AppState>, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    // this.conversation = CONVERSATIONS.find(conversation => conversation.id === +this.route.snapshot.params['id']);
    // this.route.params
    //   .subscribe((params: Params) => {
    //     this.conversation = CONVERSATIONS.find(conversation => conversation.id === +params['id'])
    //   });

    this.conversationSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((offerId) => {
          if (offerId) {
            this.store.dispatch(loadDetailedConversation({ offerId: +offerId }));
          }
          return this.store.select(selectDetailedConversation);
        }),
        skip(1)
      )
      .subscribe((conversation) => {
        if (conversation) {
          this.conversation = {...conversation};
          this.convertCategoryToMenuItems(conversation.category);
        }
      });
    
  }
  convertCategoryToMenuItems(category: Category) {
    this.categoryMenuItems =
      this.categoryService.convertCategoryToMenuItems(category);
  }

  ngOnDestroy(): void {
    this.conversationSubscription.unsubscribe();
  }

  editOffer(){

  }

  deleteOffer(){

  }

  reportOffer(){
    
  }

}
