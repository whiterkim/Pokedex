import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'version'})
export class VersionPipe implements PipeTransform {
  static selected_version = 'ultra-sun';
  static fallback_version = 'omega-ruby';

  transform(list: any[]): any[] {
    let result = list.filter(x => x.version.name === VersionPipe.selected_version);
    if (result.length === 0) {
      result = list.filter(x => x.version.name === VersionPipe.fallback_version);
    }

    return result;
  }
}
