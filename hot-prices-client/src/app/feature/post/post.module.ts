import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { ConversationListComponent } from './components/conversation/conversation-list/conversation-list.component';
import { ConversationItemComponent } from './components/conversation/conversation-item/conversation-item.component';
import { CouponListComponent } from './components/coupon/coupon-list/coupon-list.component';
import { CouponItemComponent } from './components/coupon/coupon-item/coupon-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsComponent } from './components/posts/posts.component';
import { OfferDetailsComponent } from '../offer/components/offer-details/offer-details.component';
import { RouterModule } from '@angular/router';
// import { NgImageSliderModule } from 'ng-image-slider';
import { OfferModule } from '../offer/offer.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';



@NgModule({
  declarations: [
    PostsComponent,
    ConversationListComponent,
    ConversationItemComponent,
    CouponListComponent,
    CouponItemComponent,
    PostDetailComponent,
    CommentComponent,
    CommentListComponent,
    CommentSectionComponent,
  ],
  imports: [
    SharedModule,
    OfferModule,
    RouterModule,
    PostRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PostModule { }
