import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slot'})
export class SlotPipe implements PipeTransform {
  transform(list: any[], slot: number): any {
    return list.find(x => x.slot === slot);
  }
}
