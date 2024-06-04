import { Role } from "../role/role.model";

export interface GetUserResponse {
  firstName: string;
  lastName: string;
  cellPhone: string;
  email: string;
  role: Role;
  image: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserAuthResponse {
  token: string;
  user: GetUserResponse;
}