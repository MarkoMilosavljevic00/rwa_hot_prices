import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commentReducer } from './state/comment.reducer';
import { CategoryEffects } from '../post/state/category/category.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentEffects } from './state/comment.effects';

@NgModule({
  declarations: [
    CommentComponent,
    CommentListComponent,
    CommentSectionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    StoreModule.forFeature('comments', commentReducer),
    EffectsModule.forFeature([CommentEffects]),
  ],
  exports: [
    CommentComponent,
    CommentListComponent,
    CommentSectionComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CommentModule {}
