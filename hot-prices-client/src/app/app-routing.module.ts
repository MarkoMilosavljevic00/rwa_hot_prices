import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
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
      { path: 'conversations', component: PostsComponent },
      { path: 'coupons', component: PostsComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'offers', component: PostsComponent },
      { path: 'conversations', component: PostsComponent },
      { path: 'coupons', component: PostsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
