import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, limit?: number): any {
    if(!value)
      return null;

    let definedLimit = (limit) ? limit : 160;
    return value.substr(0, definedLimit) + '...';
  }

}
