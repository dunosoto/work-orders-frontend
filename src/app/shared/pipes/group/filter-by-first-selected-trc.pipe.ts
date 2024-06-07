import { Pipe, PipeTransform } from '@angular/core';
import { GetUserResponse } from '../../models/user/user.model';
import { RoleEnumId } from '../../enums/role.enum';

@Pipe({
  name: 'filterByFirstSelectedTrc'
})
export class FilterByFirstSelectedTrcPipe implements PipeTransform {

  transform(users: GetUserResponse[] | null, usersSelected: GetUserResponse[]): GetUserResponse[] {
    const userTrcResult: any = usersSelected?.find((user: GetUserResponse) => user.role.id === RoleEnumId.TECHNICAL_SUPERVISOR);

    if (userTrcResult === undefined) {
      return users?.filter((user: GetUserResponse) => user.role.id === RoleEnumId.TECHNICAL_SUPERVISOR) as GetUserResponse[]
    }
    return users?.filter((user: GetUserResponse) => user.role.id !== RoleEnumId.TECHNICAL_SUPERVISOR) as GetUserResponse[];
  }
}
