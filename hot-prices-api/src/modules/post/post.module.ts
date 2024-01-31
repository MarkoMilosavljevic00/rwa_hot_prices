import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/models/entities/post.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { Conversation } from 'src/models/entities/conversation.entity';
import { Coupon } from 'src/models/entities/coupon.entity';
import { OfferService } from '../offer/offer.service';
import { ConversationService } from '../conversation/conversation.service';
import { Category } from 'src/models/entities/category.entity';
import { Comment } from 'src/models/entities/comment.entity';
import { Reaction } from 'src/models/entities/reaction.entity';
import { FileService } from '../file/file.service';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { User } from 'src/models/entities/user.entity';
import { CouponService } from '../coupon/coupon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Offer, Conversation, Coupon, Category, Comment, Reaction, User, Coupon])],
  controllers: [PostController],
  providers: [PostService, OfferService, ConversationService, FileService, CategoryService, UserService, CouponService],
  exports: [PostService],
})
export class PostModule {}
