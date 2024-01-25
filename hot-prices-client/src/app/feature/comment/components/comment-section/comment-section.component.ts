import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Editor } from 'primeng/editor';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { postComment } from '../../state/comment.action';
import { PostCommentDto } from '../../models/dtos/post-comment.dto';
import { COMMENTS, DEFAULT } from 'src/app/common/constants';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  postId: number;
  newContent: string = '';

  selectIdSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.selectIdSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(filter(isNotUndefined))
      .subscribe((id) => {
        this.postId = +id;
      });
  }

  ngOnDestroy() {
    this.selectIdSubscription.unsubscribe();
  }

  addNewComment(): void {
    console.log(this.newContent);
    if (this.newContent !== '' && this.postId !== -1) {
      const commentDto: PostCommentDto = {
        postId: this.postId,
        userId: DEFAULT.USER.ID,
        content: this.newContent,
      }
      this.store.dispatch(postComment({ postCommentDto: commentDto }));
    }else
      console.log('Greska pri dodavanju komentara')
    // const newComment: Comment = {
    //   id: this.comments.length, // ili pronađi najveći id i povećaj za 1
    //   content: this.newContent,
    //   postedDate: new Date(),
    //   owner: 'Novi autor',
    // };

    // this.commentService.addComment(newComment);
  }
}
