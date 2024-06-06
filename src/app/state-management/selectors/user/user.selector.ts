import { createSelector } from "@ngrx/store";
import { ConnectState } from "../../app.state";
import { UserState } from "../../states/user.state";

export const selectUserFeature = (state: ConnectState) => state.users;

export const selectListUsers = createSelector(
  selectUserFeature,
  (state: UserState) => state.users
)

export const selectLoadingUsers = createSelector(
  selectUserFeature,
  (state: UserState) => state.loading
);
