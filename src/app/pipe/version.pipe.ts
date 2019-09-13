import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'version'})
export class VersionPipe implements PipeTransform {
  static selected_version = 'omega-ruby';

  transform(list: any[]): any[] {
    return list.filter(x => x.version.name === VersionPipe.selected_version);
  }
}
