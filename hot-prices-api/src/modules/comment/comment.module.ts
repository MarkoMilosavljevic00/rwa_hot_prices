import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from 'src/models/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/models/entities/post.entity';
import { User } from 'src/models/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PostService } from '../post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  controllers: [CommentController],
  providers: [CommentService, UsersService, PostService]
})
export class CommentModule {}
