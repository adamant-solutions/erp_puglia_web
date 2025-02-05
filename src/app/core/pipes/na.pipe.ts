import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {
  transform(value: any): any {
    return value === null ? 'N/A' : value;
  }
}