import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Move, MoveDamageClass } from '../model/moves';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class MoveService {

  constructor(
    private apiService: ApiService
  ) { }

  static moveDamageClassCache: Object = {};

  getMoves(): Promise<NamedAPIResourceList> {
    return this.apiService.get("https://pokeapi.co/api/v2/move/");
  }

  getMove(url: string): Promise<Move> {
    return this.apiService.get(url);
  }

  getMoveDamageClass(url: string): Promise<MoveDamageClass> {
    return this.apiService.get(url);
  }
}
