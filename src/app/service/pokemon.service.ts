import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { PokemonData } from '../data/pokemon-data';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PokemonService {

  constructor() { }

  getPokemons(): Observable<Pokemon[]> {
    return of(PokemonData);
  }

  getPokemon(id: number): Observable<Pokemon> {
    return of(PokemonData.find(x => x.id === id));
  }
}
