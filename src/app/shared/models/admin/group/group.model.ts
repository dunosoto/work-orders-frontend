import { GetUserResponse } from "../../user/user.model";

export interface Group {
  id: number;
  prefix: string;
  status: boolean;
  users: GetUserResponse[];
}