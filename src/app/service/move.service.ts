import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Move } from '../model/moves';
import { NamedAPIResourceList } from '../model/utility';

@Injectable()
export class MoveService {

  constructor(
    private http: HttpClient
  ) { }

  async getMoves(): Promise<NamedAPIResourceList> {
    return <any> await this.http.get("https://pokeapi.co/api/v2/move/").toPromise();
  }

  async getMove(url: string): Promise<Move> {
    return <any> await this.http.get(url).toPromise();
  }
}
