import { Component, Input } from '@angular/core';
import { formatPostTime } from 'src/app/common/helpers/helpers';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: Comment;

  getPostTime() {
    if(!this.comment) 
      return new Date();
    else
      return formatPostTime(this.comment.postedDate);
  }
}
