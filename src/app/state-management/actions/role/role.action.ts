import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/shared/models/role/role.model';

export const loadRoles = createAction(
  '[ROLES] Load Roles',
);

export const loadedRoles = createAction(
  '[ROLES] Loaded Roles',
  props<{ roles: Role[] }>()
);

export const updateRole = createAction(
  '[ROLE] Update Role',
  (role: Role) => ({role})
);

export const updateRoleSucess = createAction(
  '[ROLE] Update Role Success',
  (role: Role) => ({role})
)
