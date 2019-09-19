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
    return this.apiService.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151");
  }

  getPokemonFromKey(key: string): Promise<Pokemon> {
    let url = "https://pokeapi.co/api/v2/pokemon/" + key + "/";
    return this.getPokemon(url);
  }

  getPokemon(url: string): Promise<Pokemon> {
    return this.apiService.get(url);
  }

  getSpecies(url: string): Promise<PokemonSpecies> {
    return this.apiService.get(url);
  }

  getEvolutionChain(url: string): Promise<EvolutionChain> {
    return this.apiService.get(url);
  }
}
