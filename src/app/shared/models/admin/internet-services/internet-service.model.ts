import { BaseModel } from "../../base.model";
import { ClientAddress } from "../client/client-address.model";
import { ClientGet } from "../client/client.model";

export interface GetInternetService {
  id: number,
  instance: string;
  type: BaseModel;
  access: BaseModel;
  client: GetClientService;
}

interface GetClientService extends Omit<ClientGet, 'addresses'> {
  address: ClientAddress;
}

export interface DataFormPostInternetService {
  instance: string;
  addressId: number;
  client: PostClientDataService;
  typeId: number;
  accessId: number;
  service_id?: number;
  olt: string;
  nap: string;
  port: string;
  box: string;
  pair: string;
  node: string;
  descent: string;
  primary: string;
  observation: string;
}

export interface PostClientDataService {
  id: number | undefined;
  addressId: number;
}

export interface PostInternetService {
  instance: string;
  addressId: number;
  client: PostClientDataService;
  typeId: number;
  accessId: number;
  technicalDatas: TechnicalDatas;
}

export interface PutInternetService extends PostInternetService {
  id: number;
  clientId: number;
}

interface TechnicalDatas {
  serviceId?: number;
  olt: string;
  nap: string;
  port: string;
  box: string;
  pair: string;
  node: string;
  descent: string;
  primary: string;
  observation: string;
}

export interface GetTypesInternetServices extends BaseModel {
}

export interface GetServiceAccess extends BaseModel {
}

export interface GetServicesConections extends BaseModel {
}
