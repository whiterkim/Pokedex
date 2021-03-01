import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'version'})
export class VersionPipe implements PipeTransform {
  static version_list = [
    "red",
    "blue",
    "yellow",
    "gold",
    "silver",
    "crystal",
    "ruby",
    "sapphire",
    "emerald",
    "firered",
    "leafgreen",
    "diamond",
    "pearl",
    "platinum",
    "heartgold",
    "soulsilver",
    "black",
    "white",
    "colosseum",
    "xd",
    "black-2",
    "white-2",
    "x",
    "y",
    "omega-ruby",
    "alpha-sapphire",
    "sun",
    "moon",
    "ultra-sun",
    "ultra-moon",
    "lets-go-pikachu",
    "lets-go-eevee",
    "sword",
    "shield",
  ];

  static version_list_size = 34;

  get(list: any[], index: number): any[] {
    if (index < 0) {
      throw "unexpected"
    }

    let version = VersionPipe.version_list[index];
    let result = list.filter(x => x.version.name === version);
    if (result.length === 0) {
      return this.get(list, index - 1);
    }

    return result;
  }

  transform(list: any[]): any[] {
    return this.get(list, VersionPipe.version_list_size - 1);
  }
}
