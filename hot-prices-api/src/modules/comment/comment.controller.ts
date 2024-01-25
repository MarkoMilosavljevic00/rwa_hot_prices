import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PostCommentDto } from './dtos/post-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  getCommentsByPostId(
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Get(':postId/:numOfComments')
  getNumOfCommentsByPostId(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('numOfComments', ParseIntPipe) numOfComments: number,
  ) {
    return this.commentService.getCommentsByPostId(postId, numOfComments);
  }

  @Post()
  postComment(@Body() postCommentDto: PostCommentDto){
    return this.commentService.postComment(postCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number){
    return this.commentService.deleteComment(id);
  }

}
