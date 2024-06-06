import { Role } from "../role/role.model";

export interface GetUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  cellPhone: string;
  email: string;
  role: Role;
  image: string;
}

export interface PostUser {
  firstName: string;
  lastName: string;
  cellPhone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  roleId: number;
  avatar: string;
}

export interface PutUser extends Omit<PostUser, 'password, passwordConfirmation'> {
  id: number;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserAuthResponse {
  token: string;
  user: GetUserResponse;
}