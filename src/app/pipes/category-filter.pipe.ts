import { Pipe, PipeTransform } from '@angular/core';
import { strict } from 'assert';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: Array<Article>, category?: string): Array<Article>
  {
    if(category != '')
    {
      return value.filter( str => str.category == category);
    }
    return value;
  }
}
