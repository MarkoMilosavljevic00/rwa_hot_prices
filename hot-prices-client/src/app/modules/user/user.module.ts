import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user-page/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    UserComponent,
    UserProfileComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule {}
