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
    return <any> this.apiService.getFromApi('egg-group');
  }

  getEggGroupFromKey(key: string): Promise<EggGroup> {
    return this.apiService.getFromApi('egg-group', key);
  }

  getEggGroup(url: string): Promise<EggGroup> {
    return this.apiService.getFromUrl(url);
  }
}
