import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClientById'
})
export class FilterClientByIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
