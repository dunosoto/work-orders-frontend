import { Observable } from "rxjs";
import { GetLabelResonse } from "../../label.model";
import { GetUserResponse } from "../../user/user.model";
import { Role } from "../../role/role.model";

export interface DataGlobalStore{
  roles$?: Observable<Role[]>,
  users$?: Observable<GetUserResponse[]>,
  tags$?: Observable<GetLabelResonse[]>,
}
