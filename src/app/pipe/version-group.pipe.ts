import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'versionGroup'})
export class VersionGroupPipe implements PipeTransform {
  static selected_version_group = 'omega-ruby-alpha-sapphire';

  transform(list: any[]): any[] {
    return list.filter(x => x.version_group.name === VersionGroupPipe.selected_version_group);
  }
}
