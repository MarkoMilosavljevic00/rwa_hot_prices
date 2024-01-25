import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { deleteComment } from '../../state/comment.action';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: Comment;

  constructor(private store: Store<AppState>){}

  formatDate(date: Date): Date {
    return new Date(date);
  }

  formatImage(imgPath?: string): string | undefined {
    if (imgPath) {
      return IMAGES_URL + '/user-avatars/' + imgPath;
    } else {
      return DEFAULT.USER.IMAGE;
    }
  }

  onDeleteComment() {
    this.store.dispatch(deleteComment({ commentId: this.comment.id }));
  }
}
