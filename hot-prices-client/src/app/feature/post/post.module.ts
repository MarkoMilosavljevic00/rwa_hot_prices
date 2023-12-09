import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsComponent } from './components/posts/posts.component';
import { RouterModule } from '@angular/router';
// import { NgImageSliderModule } from 'ng-image-slider';
import { OfferModule } from '../offer/offer.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostDetailComponent,
    CommentComponent,
    CommentListComponent,
    CommentSectionComponent,
  ],
  imports: [
    SharedModule,
    OfferModule,
    RouterModule,
    PostRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PostModule { }
