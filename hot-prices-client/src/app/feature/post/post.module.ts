import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsComponent } from './components/posts/posts.component';
import { RouterModule } from '@angular/router';
import { OfferModule } from '../offer/offer.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentComponent } from '../comment/components/comment/comment.component';
import { CommentListComponent } from '../comment/components/comment-list/comment-list.component';
import { CommentSectionComponent } from '../comment/components/comment-section/comment-section.component';
import { PostFormularComponent } from './components/post-formular/post-formular.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './state/category/category.reducer';
import { CategoryEffects } from './state/category/category.effects';
import { EffectsModule } from '@ngrx/effects';
import { CommentModule } from '../comment/comment.module';
import { ReactionComponent } from '../reaction/components/reaction.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostDetailComponent,
    PostFormularComponent,
  ],
  imports: [
    SharedModule,
    OfferModule,
    CommentModule,
    RouterModule,
    PostRoutingModule,
    StoreModule.forFeature('categories', categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PostModule { }
