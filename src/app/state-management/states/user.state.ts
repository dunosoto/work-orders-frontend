import { GetUserResponse } from "src/app/shared/models/user/user.model";

export interface UserState {
  loading: boolean,
  users: GetUserResponse[]
}