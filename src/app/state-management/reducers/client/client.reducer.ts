import { createReducer, on } from "@ngrx/store";
import { ClientDataDetailState, ClientState } from "../../states/client/client.state";
import { 
  addClientSuccess,
  loadClientById,
  loadClients,
  loadedClientById,
  loadedClients } from "../../actions/client/client.action";
import { ClientGet } from "src/app/shared/models/admin/client/client.model";

//Estado inicial
export const initialClientState: ClientState = { loading: false, payload: [] }

export const clientsReducer = createReducer(
  initialClientState,
  on(loadClients, (state) => {
    return { ...state, loading: true }
  }),
  on(loadedClients, (state, { payload }) => {
    return { ...state, loading: false, payload }
  }),
  on(addClientSuccess, (state, { payload }) => {
    return { ...state, loading: false, payload: [...state.payload, payload] }
  })
);

const initialClientDataDetail: ClientDataDetailState = {
  loading: false,
  payload: {} as ClientGet
}

export const clientDataDetailReducer = createReducer(
  initialClientDataDetail,
  on(loadClientById, (state, { payload }) => {
    return { ...state, loading: true, payload }
  }),
  on(loadedClientById, (state, { payload }) => {
    return { ...state, loading: false, payload }
  })
);

