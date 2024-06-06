import { createAction, props } from "@ngrx/store";
import { GetUserResponse, PostUser } from "src/app/shared/models/user/user.model";

export const loadUsers = createAction(
  '[USERS] Load Users'
);

export const loadedUsers = createAction(
  '[USERS] Loaded Users',
  props<{ users: GetUserResponse[]}>()
);

export const createUser = createAction(
  '[USER] Create User',
  (user: PostUser) => ({user})
);

export const updateUser = createAction(
  '[USER] Update User',
  (user: PostUser, userId: number) => ({user, userId})
);