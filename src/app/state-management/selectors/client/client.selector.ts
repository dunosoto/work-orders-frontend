import { createSelector } from '@ngrx/store';
import { ConnectState } from '../../app.state';
import { ClientDataDetailState, ClientState } from '../../states/client/client.state';

export const selectClientsFeature = (state: ConnectState) => state.clients;

export const selectListClients = createSelector(
  selectClientsFeature,
  (state: ClientState) => state.payload
);

export const selectLoadingClients = createSelector(
  selectClientsFeature,
  (state: ClientState) => state.loading
);

export const selectClientDataDetailFeature = (state: ConnectState) => state.clientDataDetail;


export const selectLoadingClientDataDetail = createSelector(
  selectClientDataDetailFeature,
  (state: ClientDataDetailState) => state.loading
);

export const selectClientDataDetail = createSelector(
  selectClientDataDetailFeature,
  (state: ClientDataDetailState) => state.payload
);

