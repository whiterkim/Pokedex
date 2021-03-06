import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Ability } from '../model/pokemon';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class AbilityService {

  constructor(
    private apiService: ApiService
  ) { }

  getAbilities(): Promise<NamedAPIResourceList> {
    return this.apiService.get("https://pokeapi.co/api/v2/ability/");
  }

  getAbility(url: string): Promise<Ability> {
    return this.apiService.get(url);
  }
}
