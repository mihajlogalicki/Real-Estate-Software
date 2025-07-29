import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(properties: any[], searchText: string, name: string) : any[] {
     const result = [];

     if(!properties || properties.length == 0 || searchText == ""){
        return properties;
     }

     searchText = searchText.toLowerCase();
 
     for(let property of properties){
        if(property[name].toLowerCase().includes(searchText)){
           result.push(property);
        }
     }

     return result;
  }
}
