import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { ReactionController } from './reaction.controller';
import { User } from 'src/models/entities/user.entity';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from '../post/post.service';
import { FileService } from '../file/file.service';
import { Comment } from 'src/models/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, User, Post, Comment])],
  controllers: [ReactionController],
  providers: [ReactionService, UserService, PostService, FileService],
  exports: [ReactionService],
})
export class ReactionModule {}
