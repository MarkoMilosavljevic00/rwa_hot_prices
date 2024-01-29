import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.action';
import { AuthService } from '../services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MessageSeverity } from 'src/app/common/enums/message-severity.enum';
import { Router } from '@angular/router';
import { KEYS } from 'src/app/common/constants';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.login),
      // tap(({ loginAuthDto }) => console.log('login effect', loginAuthDto)),
      switchMap(({ loginAuthDto }) => {
        const accessToken = localStorage.getItem(KEYS.TOKEN);
        return this.authService.login(loginAuthDto).pipe(
          tap(({ user, accessToken }) =>
            console.log('login dispatched', accessToken)
          ),
          map(({ user, accessToken }) =>
            AuthActions.loginSuccess({ user, accessToken })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      })
    )
  );


  autoLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.autoLogin),
      tap(() => console.log('autologin effect')),
      switchMap(({ accessToken }) =>
        this.authService.loginByToken(accessToken).pipe(
          tap(() => console.log('autologin')),
          map(({ user, accessToken }) =>
            AuthActions.autoLoginSuccess({ user, accessToken })
          ),
          catchError((error) => of(AuthActions.autoLoginFaliure({error})))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem(KEYS.TOKEN);
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user, accessToken }) => {
          localStorage.setItem(KEYS.TOKEN, accessToken);
          this.router.navigate(['/posts/offers']);
          this.notificationService.showMessage(
            MessageSeverity.SUCCESS,
            'Success',
            'Logged in successfully'
          );
        })
      ),
    { dispatch: false }
  );

  autoLoginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.autoLoginSuccess),
        tap(({ user, accessToken }) => {
          localStorage.setItem(KEYS.TOKEN, accessToken);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.loginFailure),
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

  constructor(
    private action$: Actions,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
}
