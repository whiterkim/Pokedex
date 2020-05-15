import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Type } from '../model/pokemon';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class TypeService {

  constructor(
    private apiService: ApiService
  ) { }

  getTypes(): Promise<NamedAPIResourceList> {
      return <any> this.apiService.getFromApi('type');
  }

  getType(url: string): Promise<Type> {
    return this.apiService.getFromUrl(url);
  }
}
