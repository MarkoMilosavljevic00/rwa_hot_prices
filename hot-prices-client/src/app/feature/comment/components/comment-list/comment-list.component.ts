import { Component, OnChanges, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import {
  loadAllCommentsByPostId,
  loadNumOfCommentsByPostId,
} from '../../state/comment.action';
import { COMMENTS } from 'src/app/common/constants';
import { selectCommentsList } from '../../state/comment.selector';
import { isNotUndefined } from 'src/app/common/type-guards';
import { Subscription, filter, skip, switchMap } from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];
  postId: number = -1;
  showAllComments = false; // Dodaj ovo kao promenljivu u tvom kodu

  commentSubscribe: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.commentSubscribe = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((id) => {
          this.postId = +id;
          this.store.dispatch(
            loadNumOfCommentsByPostId({
              postId: +id,
              numOfComments: COMMENTS.INITIAL_SIZE,
            })
          );
          return this.store.select(selectCommentsList);
        })
        // skip(1)
      )
      .subscribe((comments) => (this.comments = comments));
  }

  ngOnDestroy() {
    this.commentSubscribe.unsubscribe();
  }

  showMoreComments() {
    this.showAllComments = true;
    this.store.dispatch(loadAllCommentsByPostId({ postId: this.postId }));
  }

  showLessComments() {
    this.showAllComments = false;
    this.comments = this.comments.slice(0, COMMENTS.INITIAL_SIZE);
  }
}
