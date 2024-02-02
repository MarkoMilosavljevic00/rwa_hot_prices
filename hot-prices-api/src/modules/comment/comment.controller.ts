import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PostCommentDto } from './dtos/post-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { ResourceType } from 'src/common/enums/resource-type.enum';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':postId')
  getCommentsByPostId(
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':postId/:numOfComments')
  getNumOfCommentsByPostId(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('numOfComments', ParseIntPipe) numOfComments: number,
  ) {
    return this.commentService.getCommentsByPostId(postId, numOfComments);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  postComment(@Body() postCommentDto: PostCommentDto, @Req() req){
    return this.commentService.postComment(req.user.id, postCommentDto);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard(ResourceType.COMMENT))
  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number){
    return this.commentService.deleteComment(id);
  }

}
