import { GetInternetService, GetServiceAccess, GetServicesConections, GetTypesInternetServices } from "src/app/shared/models/admin/internet-services/internet-service.model";

export interface IInternetServicesState {
  loading: boolean;
  payload: GetInternetService[];
}

export interface IInternetServicesTypesState {
  loading: boolean;
  payload: GetTypesInternetServices[]
}

export interface IInternetServicesAccessState {
  loading: boolean;
  payload: GetServiceAccess[]
}

export interface IInternetServicesConectionsState {
  loading: boolean;
  payload: GetServicesConections[]
}
