import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSources'
})
export class FilterSourcesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
