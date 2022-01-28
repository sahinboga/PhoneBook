import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Customer[], filterText: string): Customer[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((c:Customer)=>c.customerName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
