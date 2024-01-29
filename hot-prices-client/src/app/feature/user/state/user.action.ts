import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserActivity } from '../models/user-activity';

export const loadUserActivity = createAction(
  '[User] Load User activity',
  props<{ id: number }>()
);

export const loadUserActivitySuccess = createAction(
  '[User] Load User activity success',
  props<{ userActivity: UserActivity }>()
);

export const loadUserActivityFailure = createAction(
  '[User] Load User activity failure',
  props<{ error: any }>()
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

export const updateUserFailure = createAction(
  '[User] Update User failure',
  props<{ error: any }>()
);
