import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { OfferModule } from './offer/offer.module';
import { ConversationModule } from './conversation/conversation.module';
import { CouponModule } from './coupon/coupon.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostModule,
    OfferModule,
    ConversationModule,
    CouponModule,
    AuthModule,
    UserModule,
  ]
})
export class FeatureModule { }
