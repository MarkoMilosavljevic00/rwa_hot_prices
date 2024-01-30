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
  selectSelectedUser,
} from '../../state/user.selector';
import { Role } from 'src/app/common/enums/role.enum';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { UserActivity } from '../../models/user-activity';
import { Subscription, combineLatest, skip, switchMap, tap } from 'rxjs';
import {
  loadCurrentUserActivity,
  loadSelectedUser,
} from '../../state/user.action';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { ImageType } from 'src/app/common/enums/image-type.enum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user?: User;
  userActivity?: UserActivity;

  userSubscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.userSubscription = combineLatest([
      this.store.select(selectIdFromRouteParams),
      this.store.select(selectCurrentUser),
    ])
      .pipe(
        
        switchMap(([routeId, currentUser]) => {
          if (routeId) {
            this.store.dispatch(loadSelectedUser({ id: +routeId }));
            return this.store.select(selectSelectedUser);
          } else {
            this.user = currentUser;
            this.store.dispatch(
              loadCurrentUserActivity({ id: currentUser!.id })
            );
            return this.store.select(selectCurrentUserActivity);
          }
        })
      )
      .subscribe((userOrActivity: User | UserActivity | undefined) => {
        if (userOrActivity && 'userActivity' in userOrActivity) {
          this.user = userOrActivity;
          this.userActivity = userOrActivity.userActivity;
        } else {
          this.userActivity = userOrActivity as UserActivity;
        }
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  isAdmin(): boolean {
    return this.user?.role === Role.Admin;
  }

  formatDate(date: Date): Date {
    return new Date(date!);
  }

  formatImage(imgPath: string | undefined) {
    if (imgPath) {
      return `${IMAGES_URL}/${ImageType.UserImage}/${imgPath}`;
    } else {
      return DEFAULT.USER.IMAGE;
    }
  }
}

// function instanceOfUser(data: any): data is User {
//   return 'userActivity' in data;
// }
