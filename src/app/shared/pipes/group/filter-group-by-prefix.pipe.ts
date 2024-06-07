import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../../models/admin/group/group.model';

@Pipe({
  name: 'filterGroupByPrefix'
})
export class FilterGroupByPrefixPipe implements PipeTransform {

  transform(groups: Group[] | null, textToSearch: string): Group[] {
    const textToSearchLowerCase = textToSearch.toLowerCase();
    if (textToSearch = "" && groups) {
      return groups as Group[];
    }
    return groups?.filter((groupItem: Group) => groupItem.prefix.toLowerCase().includes(textToSearchLowerCase)) as Group[];
  }

}
