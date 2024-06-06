import { createSelector } from "@ngrx/store";
import { ConnectState } from "../../app.state";
import { RoleState } from "../../states/role/role.state";

export const selectRoleFeature = (state: ConnectState) => state.roles;

export const selectListRoles = createSelector(
  selectRoleFeature,
  (state: RoleState) => state.roles
);

export const selectLoadingRoles = createSelector(
  selectRoleFeature,
  (state: RoleState) => state.loading
);