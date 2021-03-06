import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NamedAPIResourceList } from '../model/utility';
import { Item } from '../model/items';

@Injectable()
export class ItemService {

  constructor(
    private apiService: ApiService
  ) { }

  getItemList(): Promise<NamedAPIResourceList> {
    return this.apiService.get("https://pokeapi.co/api/v2/item/");
  }

  getItem(url: string): Promise<Item> {
    return this.apiService.get(url);
  }
}
