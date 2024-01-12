import { Component, OnChanges, OnInit } from '@angular/core';
import { CommentService } from '../../comment.service';
import { CommentTest } from '../../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit, OnChanges {
  comments: CommentTest[] = [];
  showAllComments = false; // Dodaj ovo kao promenljivu u tvom kodu

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getAllComments();
  }

  ngOnChanges(): void {
    // this.comments = this.commentService.getAllComments();
  }

  getAllComments(): void {
    this.comments = this.commentService.getAllComments();
  }

  showMoreComments() {
    this.showAllComments = true;
  }

  showLessComments() {
    this.showAllComments = false;
  }
}
