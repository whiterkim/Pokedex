import { Pipe, PipeTransform } from '@angular/core';
import { Utility } from '../utility';

@Pipe({name: 'versionGroup'})
export class VersionGroupPipe implements PipeTransform {
  transform(list: any[]): any[] {
    return list.filter(x => x.version_group.name === Utility.selected_version_group);
  }
}
