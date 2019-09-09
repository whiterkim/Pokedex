import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedAPIResourceList } from '../model/utility';
import { Utility } from '../utility';

@Injectable()
export class PokemonService {

  pokemonList: NamedAPIResourceList[];

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Promise<any> {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/").toPromise();
  }

  getPokemon(id: number): Promise<any> {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id + "/";
    return this.http.get(url).toPromise();
  }

  getSpecies(id: number): Promise<any> {
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + id + "/";
    return this.http.get(url).toPromise();
  }

  async getPokemonDetail(id: number) {
    let pokemon = await this.getPokemon(id);
    pokemon.species = await this.getSpecies(id);
    let evolution_chain = <any>await this.http.get(pokemon.species.evolution_chain.url).toPromise();
    console.log(pokemon);
    console.log(pokemon.species);
    console.log(pokemon.evolution_chain);

    // Get localized Pokemon info
    pokemon.name = Utility.getMatchedLanguage(pokemon.species.names).name;
    delete pokemon.names;

    pokemon.species.genus = Utility.getMatchedLanguage(pokemon.species.genera).genus;
    delete pokemon.species.genera;

    pokemon.flavor_text = Utility.getMatchedLanguageVersion(pokemon.species.flavor_text_entries).flavor_text;
    delete pokemon.species.flavor_text_entries;

    // Sort abilities by slot
    pokemon.abilities.sort((x, y) => x.slot > y.slot ? 1 : x.slot < y.slot ? -1 : 0);
    // Sort types by slot
    pokemon.types.sort((x, y) => x.slot > y.slot ? 1 : x.slot < y.slot ? -1 : 0);

    // Filter level-up moves and sort by level
    pokemon.level_moves = pokemon.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'level-up'));
    pokemon.level_moves.sort((x, y) => {
      var xn = x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group).level_learned_at;
      var yn = y.version_group_details.find(x => x.version_group.name === Utility.selected_version_group).level_learned_at;
      return xn > yn ? 1 : xn < yn ? -1 : 0;
    });

    // Filter machine moves
    pokemon.machine_moves = pokemon.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'machine'));

    // Filter egg moves
    pokemon.egg_moves = pokemon.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'egg'));

    // Filter tutuor moves
    pokemon.tutor_moves = pokemon.moves.filter(x =>
      x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
      x.version_group_details.find(x => x.move_learn_method.name === 'tutor'));

    delete pokemon.moves;

    pokemon.stats = {
      hp: pokemon.stats.find(x => x.stat.name == 'hp').base_stat,
      attack: pokemon.stats.find(x => x.stat.name == 'attack').base_stat,
      defense: pokemon.stats.find(x => x.stat.name == 'defense').base_stat,
      special_attack: pokemon.stats.find(x => x.stat.name == 'special-attack').base_stat,
      special_defense: pokemon.stats.find(x => x.stat.name == 'special-defense').base_stat,
      speed: pokemon.stats.find(x => x.stat.name == 'speed').base_stat
    };

    // Convert evolution tree into a simple list, only the first child is considered.
    // TODO: use the evolution tree correctly.
    pokemon.evolution_list = [];
    for (let current_node = evolution_chain.chain; current_node; current_node = current_node.evolves_to[0]) {
      pokemon.evolution_list.push(current_node);
    }
    console.log(pokemon.evolution_list);

    return pokemon;
  }
}
