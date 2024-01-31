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
import { OfferService } from '../offer/offer.service';
import { Offer } from 'src/models/entities/offer.entity';
import { ConversationService } from '../conversation/conversation.service';
import { Category } from 'src/models/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { Conversation } from 'src/models/entities/conversation.entity';
import { Coupon } from 'src/models/entities/coupon.entity';
import { CouponService } from '../coupon/coupon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, User, Post, Comment, Offer, Category, Conversation, Coupon])],
  controllers: [ReactionController],
  providers: [ReactionService, UserService, PostService, FileService, OfferService, ConversationService, CategoryService, CouponService],
  exports: [ReactionService],
})
export class ReactionModule {}
