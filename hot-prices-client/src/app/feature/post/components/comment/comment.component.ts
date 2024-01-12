import { Component, Input } from '@angular/core';
import { CommentTest } from '../../models/comment.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: CommentTest;
}
