import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedAPIResourceList, NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';
import { PokemonDetail, PokemonBasis } from '../model/pokemon';
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

  getPokemon(key: string): Promise<Pokemon> {
    let url = "https://pokeapi.co/api/v2/pokemon/" + key + "/";
    return <any> this.http.get(url).toPromise();
  }

  getSpecies(key: string): Promise<PokemonSpecies> {
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + key + "/";
    return <any> this.http.get(url).toPromise();
  }

  getEvolutionChain(url: string): Promise<EvolutionChain> {
    return <any> this.http.get(url).toPromise();
  }

  async getPokemonBasis(key: string): Promise<PokemonBasis> {
    let pokemonFromApi = <Pokemon> await this.getPokemon(key);
    let speciesFromApi = <PokemonSpecies> await this.http.get(pokemonFromApi.species.url).toPromise();

    let pokemon = new PokemonBasis();
    pokemon.id = pokemonFromApi.id;
    pokemon.key = pokemonFromApi.name;
    pokemon.name = Utility.getMatchedLanguage(speciesFromApi.names).name;

    // Sort types by slot
    pokemon.types = pokemonFromApi.types.sort((x, y) => x.slot > y.slot ? 1 : x.slot < y.slot ? -1 : 0);

    return pokemon;
  }

  async getPokemonDetail(key: string): Promise<PokemonDetail> {
    let pokemonFromApi = <Pokemon> await this.getPokemon(key);
    let speciesFromApi = <PokemonSpecies> await this.http.get(pokemonFromApi.species.url).toPromise();

    let pokemon = <PokemonDetail> await this.getPokemonBasis(key);

    // Sort abilities by slot
    pokemon.abilities = pokemonFromApi.abilities.sort((x, y) => x.slot > y.slot ? 1 : x.slot < y.slot ? -1 : 0);

    pokemon.base_experience = pokemonFromApi.base_experience;

    pokemon.capture_rate = speciesFromApi.capture_rate;

    pokemon.egg_groups = speciesFromApi.egg_groups;

    // Convert evolution tree into a simple list, only the first child is considered.
    // TODO: use the evolution tree correctly.
    let evolution_chain = <any>await this.http.get(speciesFromApi.evolution_chain.url).toPromise();
    pokemon.evolution_list = [];
    for (let current_node = evolution_chain.chain; current_node; current_node = current_node.evolves_to[0]) {
      pokemon.evolution_list.push(current_node);
    }
    console.log(pokemon.evolution_list);

    pokemon.flavor_text = Utility.getMatchedLanguageVersion(speciesFromApi.flavor_text_entries).flavor_text;

    pokemon.gender_rate = speciesFromApi.gender_rate;

    pokemon.generation = speciesFromApi.generation.name;

    pokemon.genus = Utility.getMatchedLanguage(speciesFromApi.genera).genus;

    // Filter level-up moves and sort by level
    pokemon.level_moves = pokemonFromApi.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'level-up'));
    pokemon.level_moves.sort((x, y) => {
      var xn = x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group).level_learned_at;
      var yn = y.version_group_details.find(x => x.version_group.name === Utility.selected_version_group).level_learned_at;
      return xn > yn ? 1 : xn < yn ? -1 : 0;
    });

    // Filter machine moves
    pokemon.machine_moves = pokemonFromApi.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'machine'));

    // Filter egg moves
    pokemon.egg_moves = pokemonFromApi.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'egg'));

    // Filter tutuor moves
    pokemon.tutor_moves = pokemonFromApi.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'tutor'));

    pokemon.stats = {
      hp: pokemonFromApi.stats.find(x => x.stat.name == 'hp').base_stat,
      attack: pokemonFromApi.stats.find(x => x.stat.name == 'attack').base_stat,
      defense: pokemonFromApi.stats.find(x => x.stat.name == 'defense').base_stat,
      special_attack: pokemonFromApi.stats.find(x => x.stat.name == 'special-attack').base_stat,
      special_defense: pokemonFromApi.stats.find(x => x.stat.name == 'special-defense').base_stat,
      speed: pokemonFromApi.stats.find(x => x.stat.name == 'speed').base_stat
    };

    return pokemon;
  }
}
