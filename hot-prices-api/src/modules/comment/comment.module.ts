import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from 'src/models/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/models/entities/post.entity';
import { User } from 'src/models/entities/user.entity';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { FileService } from '../file/file.service';
import { Reaction } from 'src/models/entities/reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Post, Reaction]),
    // TypeOrmModule.forFeature([User]),
    // TypeOrmModule.forFeature([Post]),
  ],
  controllers: [CommentController],
  providers: [CommentService, UserService, PostService, FileService],
  exports: [CommentService],
})
export class CommentModule {}
