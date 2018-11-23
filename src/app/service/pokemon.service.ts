import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../model/pokemon';
import { PokemonData } from '../data/pokemon-data';
import { Observable, of } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<Object> {
    return of(PokemonData);
  }

  getPokemon(id: number): Observable<Pokemon> {
    return of(PokemonData.find(x => x.id === id));
  }
}
