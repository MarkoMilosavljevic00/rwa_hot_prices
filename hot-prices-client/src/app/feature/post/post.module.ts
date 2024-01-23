import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsComponent } from './components/posts/posts.component';
import { RouterModule } from '@angular/router';
import { OfferModule } from '../offer/offer.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { PostFormularComponent } from './components/post-formular/post-formular.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './state/category/category.reducer';
import { CategoryEffects } from './state/category/category.effects';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    PostsComponent,
    PostDetailComponent,
    CommentComponent,
    CommentListComponent,
    CommentSectionComponent,
    PostFormularComponent,
  ],
  imports: [
    SharedModule,
    OfferModule,
    RouterModule,
    PostRoutingModule,
    StoreModule.forFeature('categories', categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PostModule { }
