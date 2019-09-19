import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'language'})
export class LanguagePipe implements PipeTransform {
  static selected_language = 'en';
  static fallback_language = 'en';

  transform(list: any[]): any[] {
    let result = list.filter(x => x.language.name === LanguagePipe.selected_language);
    if (result.length === 0) {
      result = list.filter(x => x.language.name === LanguagePipe.fallback_language);
    }

    return result;
  }
}
