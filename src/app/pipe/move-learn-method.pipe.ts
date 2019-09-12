import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'moveLearnMethod'})
export class MoveLearnMethodPipe implements PipeTransform {
  transform(list: any[], moveLearnMethod: string): any[] {
    return list.filter(x => x.move_learn_method.name === moveLearnMethod);
  }
}
