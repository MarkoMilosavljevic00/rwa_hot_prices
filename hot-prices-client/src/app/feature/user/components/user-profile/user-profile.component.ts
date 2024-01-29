import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { RouteMappingService } from 'src/app/shared/services/route-mapping.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  selectCurrentUser,
  selectCurrentUserActivity,
} from '../../state/user.selector';
import { Role } from 'src/app/common/enums/role.enum';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { UserActivity } from '../../models/user-activity';
import { switchMap, tap } from 'rxjs';
import { loadUserActivity } from '../../state/user.action';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user?: User;
  userActivity?: UserActivity;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store
      .select(selectCurrentUser)
      .pipe(
        tap((user) => (this.user = user)),
        tap((user) => this.store.dispatch(loadUserActivity({ id: user!.id }))),
        switchMap(() => this.store.select(selectCurrentUserActivity))
      )
      .subscribe((userActivity) => (this.userActivity = userActivity));
  }

  isAdmin(): boolean {
    return this.user?.role === Role.Admin;
  }

  formatDate(date: Date): Date {
    return new Date(date!);
  }

  formatImage(imgPath: string | undefined) {
    if (imgPath) {
      return IMAGES_URL + '/users-pictures/' + imgPath;
    } else {
      return DEFAULT.USER.IMAGE;
    }
  }
}
