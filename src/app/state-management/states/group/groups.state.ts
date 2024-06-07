import { Group } from "src/app/shared/models/admin/group/group.model";

export interface GroupState {
  loading: boolean,
  groups: Group[]
}
