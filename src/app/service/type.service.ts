import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Type } from '../model/pokemon';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class TypeService {

  constructor(
    private apiService: ApiService
  ) { }

  static typeCache: Object = {};

  getTypes(): Promise<NamedAPIResourceList> {
      return <any> this.apiService.get("https://pokeapi.co/api/v2/type/");
  }

  getType(url: string): Promise<Type> {
    return this.apiService.get(url);
  }
}
