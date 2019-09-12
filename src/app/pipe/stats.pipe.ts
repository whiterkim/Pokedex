import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stats'})
export class StatsPipe implements PipeTransform {
  transform(list: any[], stat: string): number {
    return list.find(x => x.stat.name === stat).base_stat;
  }
}
