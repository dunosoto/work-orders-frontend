import { createAction, props } from '@ngrx/store';
import { ActionPayload } from '../payload.action';
import { GetInternetService, GetServiceAccess, GetServicesConections, GetTypesInternetServices, PostInternetService, PutInternetService } from 'src/app/shared/models/admin/internet-services/internet-service.model';

export const LOAD_INTERNET_SERVICES: string = '[INTERNET_SERVICES] Load Internet Services';
export const LOADED_INTERNET_SERVICES: string = '[INTERNET_SERVICES] Loaded Internet Services';

export const LOAD_SERVICES_TYPES: string = '[INTERNET_SERVICES_TYPES] Load Internet Services Types';
export const LOADED_SERVICES_TYPES: string = '[INTERNET_SERVICES_TYPES] Loaded Internet Services Types';

export const LOAD_SERVICES_ACCESS: string = '[INTERNET_SERVICES_ACCESS] Load Internet Services Access';
export const LOADED_SERVICES_ACCESS: string = '[INTERNET_SERVICES_ACCESS] Loaded Internet Services Access';

export const LOAD_SERVICES_CONECTIONS: string = '[INTERNET_SERVICES_CONECTIONS] Load Internet Services Conections';
export const LOADED_SERVICES_CONECTIONS: string = '[INTERNET_SERVICES_CONECTIONS] Loaded Internet Services Conections';

export const ADD_INTERNET_SERVICE: string = '[INTERNET_SERVICE] Add Internet Services';
export const ADD_INTERNET_SERVICE_SUCCESS: string = '[INTERNET_SERVICE] Add Internet Services Success';

export const UPDATE_INTERNET_SERVICE: string = '[INTERNET_SERVICE_UPDATE] Update Internet Services';
export const UPDATE_INTERNET_SERVICE_SUCCESS: string = '[INTERNET_SERVICE_UPDATE] Update Internet Services Success';


export const loadInternetServices = createAction(
  LOAD_INTERNET_SERVICES,
);

export const loadedInternetServices = createAction(
  LOADED_INTERNET_SERVICES,
  props<ActionPayload<GetTypesInternetServices[]>>()
);

export const loadInternetServicesTypes = createAction(
  LOAD_SERVICES_TYPES,
);

export const loadedInternetServicesTypes = createAction(
  LOADED_SERVICES_TYPES,
  props<ActionPayload<GetTypesInternetServices[]>>()
);


export const loadInternetServicesAccess = createAction(
  LOAD_SERVICES_ACCESS,
);

export const loadedInternetServicesAccess = createAction(
  LOADED_SERVICES_ACCESS,
  props<ActionPayload<GetServiceAccess[]>>()
);

export const loadInternetServicesConections = createAction(
  LOAD_SERVICES_CONECTIONS,
);

export const loadedInternetServicesConections = createAction(
  LOADED_SERVICES_CONECTIONS,
  props<ActionPayload<GetServicesConections[]>>()
);

export const addInternetService = createAction(
  ADD_INTERNET_SERVICE,
  props<ActionPayload<PostInternetService>>()
);

export const addInternetServiceSuccess = createAction(
  ADD_INTERNET_SERVICE_SUCCESS,
  props<ActionPayload<GetTypesInternetServices>>()
);

export const updateInternetService = createAction(
  UPDATE_INTERNET_SERVICE,
  props<ActionPayload<PutInternetService>>()
);

export const updateInternetServiceSuccess = createAction(
  UPDATE_INTERNET_SERVICE_SUCCESS,
  props<ActionPayload<GetInternetService>>()
);

