import { RoleEnum } from "../../enums/role.enum";
import { BaseModel } from "../base.model";

export interface Role extends BaseModel {
  prefix: RoleEnum;
}