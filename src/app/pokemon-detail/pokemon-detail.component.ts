import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokeApiService } from '../service/pokeapi.service';
import { Pokemon, PokemonSpecies, PokemonMove } from '../model/pokemon2';
import { NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;
  species: PokemonSpecies;
  levelMoves: PokemonMove[];
  machineMoves: PokemonMove[];
  eggMoves: PokemonMove[];
  tutorMoves: PokemonMove[];
  id: number;

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getImageURL = Utility.getImageURL;

  getMatchedLanguageVersion = Utility.getMatchedLanguageVersion;

  getMatchedLanguage = Utility.getMatchedLanguage;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getPokemon();
    });
  }

  getPokemon(): void {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + this.id + '/';

    this.pokeApiService.getFromApi(url).subscribe(x => {
      console.log(x);
      this.pokemon = x;
      this.getPokemonSpeciesFromApi();

      // Sort abilities by slot
      this.pokemon.abilities.sort((x, y) => x.slot > y.slot ? 1 : x.slot < y.slot ? -1 : 0);

      // Filter level-up moves and sort by level
      this.levelMoves = this.pokemon.moves.filter(x =>
        x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
        x.version_group_details.find(x => x.move_learn_method.name === 'level-up'));
      this.levelMoves.sort((x, y) => {
        var xn = x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group).level_learned_at;
        var yn = y.version_group_details.find(x => x.version_group.name === Utility.selected_version_group).level_learned_at;
        return xn > yn ? 1 : xn < yn ? -1 : 0;
      });

      // Filter machine moves
      this.machineMoves = this.pokemon.moves.filter(x =>
        x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
        x.version_group_details.find(x => x.move_learn_method.name === 'machine'));

      // Filter egg moves
      this.eggMoves = this.pokemon.moves.filter(x =>
        x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
        x.version_group_details.find(x => x.move_learn_method.name === 'egg'));

      // Filter tutuor moves
      this.tutorMoves = this.pokemon.moves.filter(x =>
        x.version_group_details.find(x => x.version_group.name === Utility.selected_version_group) &&
        x.version_group_details.find(x => x.move_learn_method.name === 'tutor'));
    });
  }

  getPokemonSpeciesFromApi(): void {
    this.pokeApiService.getFromApi(this.pokemon.species.url).subscribe(x => {
      this.species = x;
      console.log(this.species);
    });
  }

  goPokemon(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  goAbility(ability: NamedAPIResource): void {
    console.log(ability);
    this.router.navigate(['/ability', Utility.getIDFromUrl(ability.url)]);
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', Utility.getIDFromUrl(move.url)]);
  }

  getSlot(list: any[], slot: number): any {
    return list.find(x => x.slot == slot);
  }

  getStat(name: string): number {
    return this.pokemon.stats.find(x => x.stat.name == name).base_stat;
  }
}
