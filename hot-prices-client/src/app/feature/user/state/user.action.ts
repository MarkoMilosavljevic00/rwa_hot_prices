import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserActivity } from '../models/user-activity';

export const loadCurrentUserActivity = createAction(
  '[User] Load current User activity',
  props<{ id: number }>()
);

export const loadCurrentUserActivitySuccess = createAction(
  '[User] Load current User activity success',
  props<{ userActivity: UserActivity }>()
);

export const loadSelectedUser = createAction(
  '[User] Load selected User activity',
  props<{ id: number }>()
);

export const loadSelectedUserSuccess = createAction(
  '[User] Load selected User success',
  props<{ user: User, userActivity: UserActivity }>()
);

export const updateProfilePicture = createAction(
  '[User] Update profile picture',
  props<{ id: number; profilePicture: string }>()
);

export const updateUsername = createAction(
  '[User] Update username',
  props<{ id: number; username: string }>()
);

export const updatePassword = createAction(
  '[User] Update password',
  props<{ id: number; currentPassword: string; newPassword: string }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User success',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);

export const userFailure = createAction(
  '[User] Load User activity failure',
  props<{ error: any }>()
);

// export const deleteUserFailure = createAction(
//   '[User] Delete User Failure',
//   props<{ error: any }>()
// );

// export const updateUserFailure = createAction(
//   '[User] Update User failure',
//   props<{ error: any }>()
// );