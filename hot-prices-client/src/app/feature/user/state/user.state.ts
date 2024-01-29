import { UserActivity } from "../models/user-activity";
import { User } from "../models/user.model";

export interface UserState {
  currentUser?: User;
  currentUserActivity?: UserActivity;
}