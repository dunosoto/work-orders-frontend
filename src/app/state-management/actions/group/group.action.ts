import { createAction, props } from '@ngrx/store';
import { Group } from 'src/app/shared/models/admin/group/group.model';


export const loadGroups = createAction(
  '[GROUPS] Load Groups',
);

export const loadedGroups = createAction(
  '[GROUPS] Loaded Groups',
  props<{ groups: Group[] }>()
);
