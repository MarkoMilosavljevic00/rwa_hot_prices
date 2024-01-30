import { createReducer, on } from '@ngrx/store';
import * as Actions from './auth.action';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(Actions.loginSuccess, Actions.autoLoginSuccess, Actions.signupSuccess, (state, { accessToken }) => {
    return {
      ...state,
      isAuthenticated: true,
      token: accessToken,
    };
  }),
  on(Actions.logout, Actions.autoLoginFaliure, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      token: undefined,
    };
  })
);
