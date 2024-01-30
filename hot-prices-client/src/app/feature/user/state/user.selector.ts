import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';


export const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.currentUser
);

export const selectSelectedUser = createSelector(
  selectUserFeature,
  (state: UserState) => state.selectedUser
);

export const selectCurrentUserActivity = createSelector(
  selectUserFeature,
  (state: UserState) => state.currentUserActivity
);

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser?.id
);