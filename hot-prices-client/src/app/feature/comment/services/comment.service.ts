import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../../post/models/category.model';
import { PostCommentDto } from '../models/dtos/post-comment.dto';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  getAllCommentsByPostId(postId: number) {
    return this.http.get<Comment[]>(`${environment.api}/comment/${postId}`);
  }

  getNumOfCommentsByPostId(postId: number, numOfComments: number) {
    return this.http.get<Comment[]>(
      `${environment.api}/comment/${postId}/${numOfComments}`
    );
  }

  postComment(postCommentDto: PostCommentDto) {
    console.log(postCommentDto);
    return this.http.post<Comment>(`${environment.api}/comment`, postCommentDto);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${environment.api}/comment/${commentId}`);
  }

  constructor(private http: HttpClient) {}
}
