import { ClientDataDetailState, ClientState } from "./states/client/client.state";
import { GroupState } from "./states/group/groups.state";
import { IInternetServicesAccessState, IInternetServicesConectionsState, IInternetServicesState, IInternetServicesTypesState } from "./states/internet-services/internet-services.state";
import { RoleState } from "./states/role/role.state";
import { UserState } from "./states/user.state";

export interface ConnectState {
  users: UserState,
  roles: RoleState,
  groups: GroupState,
  clients: ClientState,
  clientDataDetail: ClientDataDetailState,
  internetServices: IInternetServicesState;
  internetServicesTypes: IInternetServicesTypesState;
  internetServicesAccess: IInternetServicesAccessState;
  internetServicesConections: IInternetServicesConectionsState;
  // addresses: AddressState
  // assistances: AssistanceState
  // workOrders: WorkOrderState
}