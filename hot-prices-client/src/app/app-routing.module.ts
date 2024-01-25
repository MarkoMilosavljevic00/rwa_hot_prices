import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/pages/login/login.component';
import { SignupComponent } from './feature/auth/pages/signup/signup.component';
import { CommentListComponent } from './feature/comment/components/comment-list/comment-list.component';
import { CommentComponent } from './feature/comment/components/comment/comment.component';
import { UserAvatarComponent } from './shared/components/user-avatar/user-avatar.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
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
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin.module').then((m) => m.AdminModule),
  },
  // { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
