import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { OfferListComponent } from '../offer/components/offer-list/offer-list.component';
import { OfferDetailsComponent } from '../offer/components/offer-details/offer-details.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ConversationListComponent } from '../conversation/components/conversation-list/conversation-list.component';
import { CouponListComponent } from '../coupon/components/coupon-list/coupon-list.component';
import { ConversationDetailsComponent } from '../conversation/components/conversation-details/conversation-details.component';
import { CouponDetailsComponent } from '../coupon/components/coupon-details/coupon-details.component';

const routes: Routes = [
  {path: 'details', component: PostDetailComponent ,children: [
    {path: 'offer/:id', component: OfferDetailsComponent},
    {path: 'conversation/:id', component: ConversationDetailsComponent},
    {path: 'coupon/:id', component: CouponDetailsComponent},
  ]},
  {
    path: '',
    component: PostsComponent,
    children: [
      { path: 'offers', component: OfferListComponent},
      { path: 'conversations', component: ConversationListComponent },
      { path: 'coupons', component: CouponListComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostRoutingModule {}
