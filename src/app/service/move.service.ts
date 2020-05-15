import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Machine } from '../model/machines';
import { Move, MoveDamageClass } from '../model/moves';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class MoveService {

  constructor(
    private apiService: ApiService
  ) { }

  getMoves(): Promise<NamedAPIResourceList> {
    return this.apiService.getFromApi('move');
  }

  getMoveFromKey(key: string): Promise<Move> {
    return this.apiService.getFromApi('move', key);
  }

  getMove(url: string): Promise<Move> {
    return this.apiService.getFromUrl(url);
  }

  getMoveDamageClass(url: string): Promise<MoveDamageClass> {
    return this.apiService.getFromUrl(url);
  }

  getMachine(url: string): Promise<Machine> {
    return this.apiService.getFromUrl(url);
  }
}
