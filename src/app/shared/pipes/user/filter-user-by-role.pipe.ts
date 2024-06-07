import { Pipe, PipeTransform } from '@angular/core';
import { GetUserResponse } from '../../models/user/user.model';
import { RoleEnum } from '../../enums/role.enum';

@Pipe({
  name: 'filterUserByRole'
})
export class FilterUserByRolePipe implements PipeTransform {

  transform(users: GetUserResponse[] | undefined, userRole: RoleEnum): GetUserResponse {
    return this._getUsersMap(users).get(userRole) as GetUserResponse;
  }

  private _getUsersMap(users: GetUserResponse[] | undefined | null): Map<RoleEnum, GetUserResponse> {
    const usersMap: Map<RoleEnum, GetUserResponse> = new Map(
      users?.map((user: GetUserResponse) => [user.role.prefix, user])
    );
    return usersMap;
  }

}
