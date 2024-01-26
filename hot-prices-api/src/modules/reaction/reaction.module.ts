import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { ReactionController } from './reaction.controller';
import { User } from 'src/models/entities/user.entity';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from '../post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, User, Post])],
  controllers: [ReactionController],
  providers: [ReactionService, UsersService, PostService]
})
export class ReactionModule {}
