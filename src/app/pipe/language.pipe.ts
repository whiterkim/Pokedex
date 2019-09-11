import { Pipe, PipeTransform } from '@angular/core';
import { Utility } from '../utility';

@Pipe({name: 'language'})
export class LanguagePipe implements PipeTransform {
  transform(list: any[]): any[] {
    return list.filter(x => x.language.name === Utility.selected_language);
  }
}
