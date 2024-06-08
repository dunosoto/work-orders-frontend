import { ClientGet } from "src/app/shared/models/admin/client/client.model";

export interface ClientState {
  loading: boolean;
  payload: ClientGet[];
}

export interface ClientDataDetailState {
  loading: boolean;
  payload: ClientGet;
}