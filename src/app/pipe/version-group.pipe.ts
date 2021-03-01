import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'versionGroup'})
export class VersionGroupPipe implements PipeTransform {
  static version_group_list = [
    "red-blue",
    "yellow",
    "gold-silver",
    "crystal",
    "ruby-sapphire",
    "emerald",
    "firered-leafgreen",
    "diamond-pearl",
    "platinum",
    "heartgold-soulsilver",
    "black-white",
    "colosseum",
    "xd",
    "black-2-white-2",
    "x-y",
    "omega-ruby-alpha-sapphire",
    "sun-moon",
    "ultra-sun-ultra-moon",
    "lets-go",
    "sword-shield",
  ];

  static version_group_list_size = 20;

  get(list: any[], index: number): any[] {
    if (index < 0) {
      throw "unexpected"
    }

    let version_group = VersionGroupPipe.version_group_list[index];
    let result = list.filter(x => x.version_group.name === version_group);
    if (result.length === 0) {
      return this.get(list, index - 1);
    }

    return result;
  }

  transform(list: any[]): any[] {
    return this.get(list, VersionGroupPipe.version_group_list_size - 1);
  }
}
