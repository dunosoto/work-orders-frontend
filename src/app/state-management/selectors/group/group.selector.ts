import { createSelector } from '@ngrx/store';
import { ConnectState } from '../../app.state';
import { GroupState } from '../../states/group/groups.state';

export const selectGroupsFeature = (state: ConnectState) => state.groups;

export const selectListGroups = createSelector(
  selectGroupsFeature,
  (state: GroupState) => state.groups
);

export const selectLoadingGroups = createSelector(
  selectGroupsFeature,
  (state: GroupState) => state.loading
);
