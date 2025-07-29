import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: false
})
export class SortPipe implements PipeTransform {

  transform(properties: any[], sortArgs: any[]) : any[] {
    const sortField = sortArgs[0];   
    const sortOrder = sortArgs[1];

    if(!properties || properties.length == 0) return properties;

    let multiplier = sortOrder == 'asc' ? 1 : -1;

    properties.sort((a: any, b: any) => {
      if(a[sortField] < b[sortField]) {
        return -1 * multiplier;
      }
      else if(a[sortField] > b[sortField]) {
        return 1 * multiplier;
      }
      else {
         return 0;
      }
    })

     return properties;
  }
}
