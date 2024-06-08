export interface ClientAddress {
  id?: number;
  placeId: string;
  lat: string;
  lon: string;
  location: string;
  city: string;
  direction: string;
  clientId: number | undefined;
  description: string;
}

export interface AddNewServiceToClientAddress {
  dataAddress: ClientAddress,
  clientId: number | undefined
}

export interface IClientAddressForm {

}
