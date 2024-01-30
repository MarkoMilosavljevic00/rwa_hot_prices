import { createAction, props } from '@ngrx/store';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { User } from '../../user/models/user.model';
import { SignupAuthDto } from '../dtos/signup-auth.dto';

export const signup = createAction(
  '[Auth] Signup',
  props<{ signupAuthDto: SignupAuthDto }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup success',
  props<{ user: User; accessToken: string }>()
);

export const signupFailure = createAction(
  '[Auth] Signup failure',
  props<{ error: any }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ loginAuthDto: LoginAuthDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ user: User; accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login failure',
  props<{ error: any }>()
);

export const loadToken = createAction(
  '[Auth] Load token'
  // props<{ accessToken: string }>()
);

export const autoLogin = createAction(
  '[Auth] Auto login',
  props<{ accessToken: string }>()
);

export const autoLoginSuccess = createAction(
  '[Auth] Auto login success',
  props<{ user: User; accessToken: string }>()
);

export const autoLoginFaliure = createAction(
  '[Auth] Auto login failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');
