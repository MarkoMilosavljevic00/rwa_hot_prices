import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './components/user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';

@NgModule({
  declarations: [
    UserComponent,
    UserEditComponent,
    UserProfileComponent,
    UsersComponent,
    UserListComponent,
    UserItemComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule {}
