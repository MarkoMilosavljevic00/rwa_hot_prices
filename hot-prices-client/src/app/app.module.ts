import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { YesNoDialog } from './components/yes-no-dialog/yes-no-dialog.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';
import { UserComponent } from './pages/user/user.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { OfferListComponent } from './components/offer/offer-list/offer-list.component';
import { OfferItemComponent } from './components/offer/offer-item/offer-item.component';
import { ConversationListComponent } from './components/conversation/conversation-list/conversation-list.component';
import { ConversationItemComponent } from './components/conversation/conversation-item/conversation-item.component';
import { CouponListComponent } from './components/coupon/coupon-list/coupon-list.component';
import { CouponItemComponent } from './components/coupon/coupon-item/coupon-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    PostsComponent,
    UserComponent,
    UserProfileComponent,
    YesNoDialog,
    OfferListComponent,
    OfferItemComponent,
    ConversationListComponent,
    ConversationItemComponent,
    CouponListComponent,
    CouponItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
