import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Editor } from 'primeng/editor';
import { CommentService } from '../../comment.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent {
  newContent: string = '';

  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  addNewComment(): void {
    console.log(this.newContent);
    const newComment: Comment = {
      id: this.comments.length, // ili pronađi najveći id i povećaj za 1
      content: this.newContent,
      postedDate: new Date(),
      owner: 'Novi autor',
    };

    this.commentService.addComment(newComment);
  }
}
