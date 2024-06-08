import { ClientGet, ClientGetWithParams, ClientPost, ClientPut } from "src/app/shared/models/admin/client/client.model";
import { ActionPayload } from "../payload.action";
import { createAction, props } from "@ngrx/store";
import { ClientAddress } from "src/app/shared/models/admin/client/client-address.model";

export const loadClients = createAction(
  '[CLIENTS] Load Clients',
  props<ActionPayload<ClientGetWithParams>>()
);

export const loadedClients = createAction(
  '[CLIENTS] Loaded Clients',
  props<ActionPayload<ClientGet[]>>()
);

export const loadClientById = createAction(
  '[CLIENT] Load Client By Id',
  props<ActionPayload<ClientGet>>()
);

export const loadedClientById = createAction(
  '[CLIENT] Loaded Client By Id',
  props<ActionPayload<ClientGet>>()
);

export const addClient = createAction(
  '[CLIENT] Add Client',
  props<ActionPayload<ClientPost>>()
);

export const addClientSuccess = createAction(
  '[CLIENT] Add Client Success',
  props<ActionPayload<ClientGet>>()
);

export const updateClient = createAction(
  '[CLIENT] Update Client',
  props<ActionPayload<ClientPut>>()
);

export const updateClientSuccess = createAction(
  '[CLIENT] Update Client Success',
  props<ActionPayload<ClientGet>>()
);

export const addClientAddress = createAction(
  '[CLIENT_ADDRESS] Add Client Address',
  props<ActionPayload<ClientAddress[]>>()
);

export const addClientAddressSuccess = createAction(
  '[CLIENT_ADDRESS] Add Client Address Success',
  props<ActionPayload<ClientGet>>()
);

export const updateClientAddress = createAction(
  '[CLIENT_ADDRESS] Update Client Address',
  props<ActionPayload<ClientAddress>>()
);

export const updateClientAddressSuccess = createAction(
  '[CLIENT_ADDRESS] Update Client Address Success',
  props<ActionPayload<ClientGet>>()
);