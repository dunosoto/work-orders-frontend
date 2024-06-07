import { BaseModel } from "../../base.model";
import { GetUserResponse } from "../../user/user.model";

export interface Group {
  id: number;
  prefix: string;
  status: boolean;
  users: GetUserResponse[];
}

export interface GetGroupById extends BaseModel {
  users: GetUserResponse[];
}

export interface GroupPost {
  prefix: string;
  usersIds: number[];
}

export interface GroupPut extends Omit<Group, ' status, area, users'> {
  userIds: number[];
}

export interface GroupDelete {
  grupo: string;
  status: boolean;
}