import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationListComponent } from './components/conversation/conversation-list/conversation-list.component';
import { CouponListComponent } from './components/coupon/coupon-list/coupon-list.component';
import { OfferListComponent } from './components/offer/offer-list/offer-list.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      { path: 'offers', component: OfferListComponent },
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
