import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'genderRate'})
export class GenderRatePipe implements PipeTransform {
  transform(genderRate: number): string {
    if (genderRate === -1) {
      return "Genderless";
    }

    let femaleRate = genderRate / 8.0 * 100;
    let maleRate = 100 - femaleRate;
    return "♂" + maleRate + "% ♀" + femaleRate + "%";
  }
}
