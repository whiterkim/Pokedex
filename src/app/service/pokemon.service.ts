import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../model/pokemon';
import { PokemonData } from '../data/pokemon-data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<Object> {
    return this.http.get('/api/pokemon-list');
  }

  getPokemon(id: number): Observable<Pokemon> {
    return of(PokemonData.find(x => x.id === id));
  }
}
