import { BaseModel } from "../../base.model";
import { ClientAddress } from "./client-address.model";

export interface ClientGet extends BaseModel {
  firstName: string;
  lastName: string;
  // category: BaseModel;
  phone: string;
  identityCard: string;
  addresses: ClientAddress[];
}

export interface ClientGetWithParams{
  name: string;
  lastName: string;
}

export interface ClientPost {
  firstName: string;
  lastName: string;
  identityCard: string;
  phone: string;
}

export interface ClientPut extends ClientPost {
  id: number;
}

export interface GetClientCategory extends BaseModel {

}