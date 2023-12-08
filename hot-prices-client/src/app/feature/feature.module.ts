import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { OfferModule } from './offer/offer.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OfferModule,
    AuthModule,
    UserModule,
    PostModule,
  ]
})
export class FeatureModule { }
