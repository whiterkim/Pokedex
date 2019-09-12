import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedAPIResourceList } from '../model/utility';
import { Pokemon, PokemonSpecies } from '../model/pokemon2';
import { EvolutionChain } from '../model/evolution';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  async getPokemonList(): Promise<NamedAPIResourceList> {
    return <NamedAPIResourceList> await this.http.get("https://pokeapi.co/api/v2/pokemon/").toPromise();
  }

  getPokemonFromKey(key: string): Promise<Pokemon> {
    let url = "https://pokeapi.co/api/v2/pokemon/" + key + "/";
    return this.getPokemon(url);
  }

  getPokemon(url: string): Promise<Pokemon> {
    return <any> this.http.get(url).toPromise();
  }

  getSpecies(url: string): Promise<PokemonSpecies> {
    return <any> this.http.get(url).toPromise();
  }

  getEvolutionChain(url: string): Promise<EvolutionChain> {
    return <any> this.http.get(url).toPromise();
  }
}
