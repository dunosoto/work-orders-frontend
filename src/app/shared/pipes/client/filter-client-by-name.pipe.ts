import { Pipe, PipeTransform } from '@angular/core';
import { ClientGet } from '../../models/admin/client/client.model';

@Pipe({
  name: 'filterClientByName'
})
export class FilterClientByNamePipe implements PipeTransform {

  transform(clients: ClientGet[] | null, textToSearch: string): ClientGet[] {
    const textToSearchLowerCase = textToSearch.toLowerCase();
    if (textToSearch === "" && clients) {
      return clients;
    }
    return clients?.filter((client: ClientGet) => client.name.toLowerCase().includes(textToSearchLowerCase) || client.lastName.toLowerCase().includes(textToSearchLowerCase)) as ClientGet[]
  }

}
