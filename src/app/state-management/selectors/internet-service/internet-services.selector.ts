import { createSelector } from '@ngrx/store';
import { ConnectState } from '../../app.state';
import { IInternetServicesAccessState, IInternetServicesConectionsState, IInternetServicesState, IInternetServicesTypesState } from '../../states/internet-services/internet-services.state';

export const selectInternetServicesFeature = (state: ConnectState) => state.internetServices;
export const selectInternetServicesTypesFeature = (state: ConnectState) => state.internetServicesTypes;
export const selectInternetServicesAccessFeature = (state: ConnectState) => state.internetServicesAccess;
export const selectInternetServicesConectionsFeature = (state: ConnectState) => state.internetServicesConections;


export const selectListInternetServices = createSelector(
  selectInternetServicesFeature,
  (state: IInternetServicesState) => state.payload
);

export const selectLoadingInternetServices = createSelector(
  selectInternetServicesFeature,
  (state: IInternetServicesState) => state.loading
);


export const selectListInternetServicesTypes = createSelector(
  selectInternetServicesTypesFeature,
  (state: IInternetServicesTypesState) => state.payload
);

export const selectLoadingInternetServicestypes = createSelector(
  selectInternetServicesTypesFeature,
  (state: IInternetServicesTypesState) => state.loading
);

export const selectListInternetAccessServices = createSelector(
  selectInternetServicesAccessFeature,
  (state: IInternetServicesAccessState) => state.payload
);

export const selectLoadingInternetAccessServices = createSelector(
  selectInternetServicesAccessFeature,
  (state: IInternetServicesAccessState) => state.loading
);


export const selectListInternetConectionsServices = createSelector(
  selectInternetServicesConectionsFeature,
  (state: IInternetServicesConectionsState) => state.payload
);

export const selectLoadingInternetConectionsServices = createSelector(
  selectInternetServicesConectionsFeature,
  (state: IInternetServicesConectionsState) => state.loading
);
