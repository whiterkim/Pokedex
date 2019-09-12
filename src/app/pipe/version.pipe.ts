import { Pipe, PipeTransform } from '@angular/core';
import { Utility } from '../utility';

@Pipe({name: 'version'})
export class VersionPipe implements PipeTransform {
  transform(list: any[]): any[] {
    return list.filter(x => x.version.name === Utility.selected_version);
  }
}
