import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'versionGroup'})
export class VersionGroupPipe implements PipeTransform {
  static selected_version_group = 'ultra-sun-ultra-moon';
  static fallback_version_group = 'omega-ruby-alpha-sapphire';

  transform(list: any[]): any[] {
    let result = list.filter(x => x.version_group.name === VersionGroupPipe.selected_version_group);
    if (result.length === 0) {
      result = list.filter(x => x.version_group.name === VersionGroupPipe.fallback_version_group);
    }

    return result;
  }
}
