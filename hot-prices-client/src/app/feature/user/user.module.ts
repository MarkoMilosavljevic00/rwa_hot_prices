import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
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
