import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
import { OfferListComponent } from './components/offer/offer-list/offer-list.component';
import { OfferItemComponent } from './components/offer/offer-item/offer-item.component';
import { ConversationListComponent } from './components/conversation/conversation-list/conversation-list.component';
import { ConversationItemComponent } from './components/conversation/conversation-item/conversation-item.component';
import { CouponListComponent } from './components/coupon/coupon-list/coupon-list.component';
import { CouponItemComponent } from './components/coupon/coupon-item/coupon-item.component';



@NgModule({
  declarations: [
    PostsComponent,
    OfferListComponent,
    OfferItemComponent,
    ConversationListComponent,
    ConversationItemComponent,
    CouponListComponent,
    CouponItemComponent
  ],
  imports: [
    SharedModule,
    PostRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PostModule { }
