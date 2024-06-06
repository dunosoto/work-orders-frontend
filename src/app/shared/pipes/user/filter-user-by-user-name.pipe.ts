import { Pipe, PipeTransform } from '@angular/core';
import { GetUserResponse } from '../../models/user/user.model';

@Pipe({
  name: 'filterUserByUserName'
})
export class FilterUserByUserNamePipe implements PipeTransform {

  transform(users: GetUserResponse[] | null, userName: string): GetUserResponse[] {

    const userNameToSearch: string = userName.toLowerCase();
    if (userNameToSearch === '') {
      return users as GetUserResponse[];
    }
    return users?.filter(
      (user: GetUserResponse) => user.firstName.toLowerCase().includes(userNameToSearch) || user.lastName.toLowerCase().includes(userNameToSearch)
    ) as GetUserResponse[];
  }

}
