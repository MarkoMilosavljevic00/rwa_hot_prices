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
import { OfferService } from '../offer/offer.service';
import { ConversationService } from '../conversation/conversation.service';
import { Offer } from 'src/models/entities/offer.entity';
import { Category } from 'src/models/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { Conversation } from 'src/models/entities/conversation.entity';
import { Coupon } from 'src/models/entities/coupon.entity';
import { CouponService } from '../coupon/coupon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Post, Reaction, Offer, Category, Conversation, Coupon]),
    // TypeOrmModule.forFeature([User]),
    // TypeOrmModule.forFeature([Post]),
  ],
  controllers: [CommentController],
  providers: [CommentService, UserService, PostService, FileService, OfferService, ConversationService, CategoryService, CouponService],
  exports: [CommentService],
})
export class CommentModule {}
