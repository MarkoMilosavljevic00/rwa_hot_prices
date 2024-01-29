import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../../../feature/auth/state/auth.action';
import * as UserActions from './user.action';
import { UserState } from './user.state';

export const initialState: UserState = {};

export const userReducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    AuthActions.autoLoginSuccess,
    (state, { user }) => {
      return {
        ...state,
        currentUser: user,
      };
    }
  ),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      currentUser: undefined,
    };
  }),
  on(UserActions.loadUserActivitySuccess, (state, { userActivity }) => {
    return {
      ...state,
      currentUserActivity: userActivity,
    };
  }),
  on(UserActions.updateUserSuccess, (state, { user }) => {
    return {
      ...state,
      currentUser: user,
    };
  })
  // on(UserActions.updateProfilePictureSuccess, (state, { profilePicture: serverFilename }) => {
  //   return {
  //     ...state,
  //     currentUser: {
  //       ...state.currentUser!,
  //       profilePicture: serverFilename
  //     }
  //   }
  // })
);
