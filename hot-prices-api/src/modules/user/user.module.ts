import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from '../post/post.service';
import { FileService } from '../file/file.service';
import { AuthService } from '../auth/auth.service';
import { ReactionService } from '../reaction/reaction.service';
import { CommentService } from '../comment/comment.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { Comment } from 'src/models/entities/comment.entity';
import { ReactionModule } from '../reaction/reaction.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Reaction, Comment]),
    // TypeOrmModule.forFeature([Post]),
    // TypeOrmModule.forFeature([Reaction]),
    // TypeOrmModule.forFeature([Comment]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    FileService,
  ],
  exports: [UserService],
})
export class UserModule {}
