import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Post } from 'src/models/entities/post.entity';
import { PostService } from '../post/post.service';
import { FileService } from '../file/file.service';
import { Reaction } from 'src/models/entities/reaction.entity';
import { Comment } from 'src/models/entities/comment.entity';
import { OfferService } from '../offer/offer.service';
import { Offer } from 'src/models/entities/offer.entity';
import { ConversationService } from '../conversation/conversation.service';
import { Conversation } from 'src/models/entities/conversation.entity';
import { Category } from 'src/models/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { Coupon } from 'src/models/entities/coupon.entity';
import { CouponService } from '../coupon/coupon.service';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt',  }),
    PassportModule,
    JwtModule.register({
      secret: '17782',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Post,
      Reaction,
      Comment,
      Offer,
      Conversation,
      Category,
      Coupon
    ]),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    LocalStrategy,
    PostService,
    FileService,
    OfferService,
    ConversationService,
    CategoryService,
    CouponService
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule, LocalStrategy],
})
export class AuthModule {}
