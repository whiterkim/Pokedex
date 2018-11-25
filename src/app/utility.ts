import { TypeData } from './data/type-data'

export class Utility {

  constructor() { }

  static getTypeName(id: number): string {
    return TypeData.find(x => x.id === id).name;
  }

}
