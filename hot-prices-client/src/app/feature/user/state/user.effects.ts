import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as UserActions from './user.action';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MessageSeverity } from 'src/app/common/enums/message-severity.enum';
import { Router } from '@angular/router';
import { KEYS } from 'src/app/common/constants';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  loadUserActivity$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loadUserActivity),
      switchMap(({ id }) => {
        return this.userService.getUserActivity(id).pipe(
          map((userActivity) =>
            UserActions.loadUserActivitySuccess({ userActivity })
          ),
          catchError((error) =>
            of(UserActions.loadUserActivityFailure({ error }))
          )
        );
      })
    )
  );

  updateProfilePicture$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updateProfilePicture),
      switchMap(({ id, profilePicture }) => {
        return this.userService
          .updateProfilePicture(id, profilePicture)
          .pipe(
            map((user) => UserActions.updateUserSuccess({ user })),
            catchError((error) =>
              of(UserActions.updateUserFailure({ error }))
            )
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
          catchError((error) =>
            of(UserActions.updateUserFailure({ error }))
          )
        );
      })
    )
  );

  updatePassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updatePassword),
      switchMap(({ id, currentPassword, newPassword }) => {
        return this.userService.updatePassword(id, currentPassword, newPassword).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error }))
          )
        );
      })
    )
  );

  userFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          UserActions.loadUserActivityFailure,
          UserActions.updateUserFailure,
        ),
        tap(({ error }) =>
          this.notificationService.showMessage(
            MessageSeverity.ERROR,
            'Error',
            error.error.message
          )
        )
      ),
    { dispatch: false }
  );

  userUpdateSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          UserActions.updateUserSuccess,
        ),
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

  constructor(
    private action$: Actions,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}
}
