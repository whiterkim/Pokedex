import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NamedAPIResourceList } from '../model/utility';
import { Pokemon, PokemonSpecies } from '../model/pokemon';
import { EvolutionChain } from '../model/evolution';

@Injectable()
export class PokemonService {

  constructor(
    private apiService: ApiService
  ) { }

  getPokemonList(): Promise<NamedAPIResourceList> {
    return this.apiService.getFromApi('pokemon', null, {offset: 0, limit: 151})
  }

  getPokemonFromKey(key: string): Promise<Pokemon> {
    return this.apiService.getFromApi('pokemon', key);
  }

  getPokemon(url: string): Promise<Pokemon> {
    return this.apiService.getFromUrl(url);
  }

  getSpecies(url: string): Promise<PokemonSpecies> {
    return this.apiService.getFromUrl(url);
  }

  getEvolutionChain(url: string): Promise<EvolutionChain> {
    return this.apiService.getFromUrl(url);
  }
}
