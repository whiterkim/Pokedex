import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ability } from '../model/pokemon2';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class AbilityService {

  constructor(
    private http: HttpClient
  ) { }

  async getAbilities(): Promise<NamedAPIResourceList> {
    return <any> this.http.get("https://pokeapi.co/api/v2/ability/").toPromise();
  }

  async getAbility(url: string): Promise<Ability> {
    return <any> this.http.get(url).toPromise();
  }
}
