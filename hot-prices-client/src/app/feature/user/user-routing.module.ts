import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationListComponent } from '../conversation/components/conversation-list/conversation-list.component';
import { CouponListComponent } from '../coupon/components/coupon-list/coupon-list.component';
import { OfferListComponent } from '../offer/components/offer-list/offer-list.component';
import { PostsComponent } from '../post/components/posts/posts.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'posts',
        loadChildren: () =>
          import('../post/post.module').then((m) => m.PostModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}
