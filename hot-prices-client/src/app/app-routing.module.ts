import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/pages/login/login.component';
import { SignupComponent } from './feature/auth/pages/signup/signup.component';
import { CommentListComponent } from './feature/post/components/comment-list/comment-list.component';
import { CommentComponent } from './feature/post/components/comment/comment.component';
import { UserAvatarComponent } from './shared/components/user-avatar/user-avatar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'test', component: CommentListComponent },
  {
    path: 'posts',
    loadChildren: () =>
      import('./feature/post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./feature/user/user.module').then((m) => m.UserModule),
  },
  // { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
