import { GroupState } from "./states/group/groups.state";
import { RoleState } from "./states/role/role.state";
import { UserState } from "./states/user.state";

export interface ConnectState {
  users: UserState,
  roles: RoleState,
  groups: GroupState,
  // clients: ClientState
  // addresses: AddressState
  // assistances: AssistanceState
  // workOrders: WorkOrderState
}