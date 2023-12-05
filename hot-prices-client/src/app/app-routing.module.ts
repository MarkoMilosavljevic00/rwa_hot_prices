import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationListComponent } from './components/conversation/conversation-list/conversation-list.component';
import { CouponListComponent } from './components/coupon/coupon-list/coupon-list.component';
import { OfferListComponent } from './components/offer/offer-list/offer-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      { path: 'offers', component: OfferListComponent },
      { path: 'conversations', component: ConversationListComponent },
      { path: 'coupons', component: CouponListComponent },
    ],
  },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
