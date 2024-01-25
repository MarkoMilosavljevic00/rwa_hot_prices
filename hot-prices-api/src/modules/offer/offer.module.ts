import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { Post } from 'src/models/entities/post.entity';
import { Offer } from 'src/models/entities/offer.entity';
import { Category } from 'src/models/entities/category.entity';
import { FileService } from '../file/file.service';
import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from 'src/models/entities/comment.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Category, Comment, User, Post])],
  controllers: [OfferController],
  providers: [OfferService, FileService, CategoryService, CommentService, UsersService]
})
export class OfferModule {}
