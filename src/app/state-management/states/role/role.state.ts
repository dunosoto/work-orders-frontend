import { Role } from "src/app/shared/models/role/role.model";

export interface RoleState {
  loading: boolean,
  roles: Role[]
}