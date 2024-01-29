import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { SignupComponent } from './feature/auth/components/signup/signup.component';
import { CommentListComponent } from './feature/comment/components/comment-list/comment-list.component';
import { CommentComponent } from './feature/comment/components/comment/comment.component';
import { UserAvatarComponent } from './shared/components/user-avatar/user-avatar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './feature/auth/guards/auth.guard';
import { NoAuthGuard } from './feature/auth/guards/noAuth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
    import('./feature/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  { path: 'test', component: CommentListComponent },
  {
    path: 'posts',
    loadChildren: () =>
    import('./feature/post/post.module').then((m) => m.PostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () =>
    import('./feature/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
    import('./feature/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'posts/offers', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
