import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { OfferModule } from './modules/offer/offer.module';
import { FileModule } from './modules/file/file.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { PostModule } from './modules/post/post.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { CouponModule } from './modules/coupon/coupon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    OfferModule,
    FileModule,
    CategoryModule,
    CommentModule,
    ReactionModule,
    PostModule,
    ConversationModule,
    CouponModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
