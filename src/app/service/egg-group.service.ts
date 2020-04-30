import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EggGroup } from '../model/pokemon';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class EggGroupService {

  constructor(
    private apiService: ApiService
  ) { }

  getEggGroups(): Promise<NamedAPIResourceList> {
      return <any> this.apiService.get("https://pokeapi.co/api/v2/egg-group/");
  }

  getEggGroup(url: string): Promise<EggGroup> {
    return this.apiService.get(url);
  }
}
