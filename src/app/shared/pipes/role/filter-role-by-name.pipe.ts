import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../models/role/role.model';

@Pipe({
  name: 'filterRoleByName'
})
export class FilterRoleByNamePipe implements PipeTransform {

  transform(roles: Role[] | null, textToSearch: string): Role[] {

    const userRoleToSearch: string = textToSearch.toLowerCase();
    if (userRoleToSearch === '') {
      return roles as Role[];
    }
    return roles?.filter((role: Role) => role.name.toLowerCase().includes(userRoleToSearch)) as Role[];
  }

}
