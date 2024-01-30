import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as UserActions from './user.action';
import * as AuthActions from '../../auth/state/auth.action';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MessageSeverity } from 'src/app/common/enums/message-severity.enum';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  loadUserActivity$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loadCurrentUserActivity),
      switchMap(({ id }) => {
        return this.userService.getUserActivity(id).pipe(
          map((userActivity) =>
            UserActions.loadCurrentUserActivitySuccess({ userActivity })
          ),
          catchError((error) => of(UserActions.userFailure({ error })))
        );
      })
    )
  );

  loadSelectedUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loadSelectedUser),
      switchMap(({ id }) => {
        return this.userService.getUserWithActivity(id).pipe(
          map(({ user, activity }) =>
            UserActions.loadSelectedUserSuccess({
              user,
              userActivity: activity,
            })
          ),
          catchError((error) => of(UserActions.userFailure({ error })))
        );
      })
    )
  );

  updateProfilePicture$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updateProfilePicture),
      switchMap(({ id, profilePicture }) => {
        return this.userService.updateProfilePicture(id, profilePicture).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.userFailure({ error })))
        );
      })
    )
  );

  updateUsername$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updateUsername),
      switchMap(({ id, username }) => {
        return this.userService.updateUsername(id, username).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.userFailure({ error })))
        );
      })
    )
  );

  updatePassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updatePassword),
      switchMap(({ id, currentPassword, newPassword }) => {
        return this.userService
          .updatePassword(id, currentPassword, newPassword)
          .pipe(
            map((user) => UserActions.updateUserSuccess({ user })),
            catchError((error) => of(UserActions.userFailure({ error })))
          );
      })
    )
  );

  userUpdateSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() =>
          this.notificationService.showMessage(
            MessageSeverity.SUCCESS,
            'Success',
            'User updated successfully'
          )
        )
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => AuthActions.logout()),
          catchError(({ error }) => of(UserActions.userFailure(error)))
        )
      )
    )
  );

  userFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.userFailure),
        tap(({ error }) => {
          if(error.status === 404)
            this.router.navigateByUrl('/not-found');
          this.notificationService.showMessage(
            MessageSeverity.ERROR,
            'Error',
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}
}
