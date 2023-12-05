import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationListComponent } from '../post/components/conversation/conversation-list/conversation-list.component';
import { CouponListComponent } from '../post/components/coupon/coupon-list/coupon-list.component';
import { OfferListComponent } from '../post/components/offer/offer-list/offer-list.component';
import { PostsComponent } from '../post/pages/posts/posts.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user-page/user.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'posts', component: PostsComponent, children: [
        { path: 'offers', component: OfferListComponent },
        { path: 'conversations', component: ConversationListComponent },
        { path: 'coupons', component: CouponListComponent },
      ]},
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
