import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonService } from '../../service/pokemon.service';
import { NamedAPIResource } from '../../model/utility';
import { Pokemon, PokemonSpecies } from '../../model/pokemon';
import { VersionGroupPipe } from '../../pipe/version-group.pipe';
import { MoveLearnMethodPipe } from '../../pipe/move-learn-method.pipe';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
  providers: [VersionGroupPipe, MoveLearnMethodPipe]
})
export class PokemonDetailComponent implements OnInit {
  key: string;
  pokemon: Pokemon;
  species: PokemonSpecies;
  levelUpMoves: Object[];
  machineMoves: Object[];
  eggMoves: Object[];
  tutorMoves: Object[];

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private versionGroupPipe: VersionGroupPipe,
    private moveLearnMethodPipe: MoveLearnMethodPipe
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getPokemon();
    });
  }

  async getPokemon(): Promise<void> {
    this.pokemon = await this.pokemonService.getPokemonFromKey(this.key);
    this.species = await this.pokemonService.getSpecies(this.pokemon.species.url);

    this.levelUpMoves = this.getMoves('level-up');
    this.machineMoves = this.getMoves('machine');
    this.eggMoves = this.getMoves('egg');
    this.tutorMoves = this.getMoves('tutor');
  }

  getTotalStats(): number {
    return this.pokemon.stats.reduce((sum, x) => sum + x.base_stat, 0);
  }

  getMoves(moveLearnMethod: string) {
    let result = this.pokemon.moves.map(pokemonMove => {
      const versionGroupMatched = this.versionGroupPipe.transform(pokemonMove.version_group_details);
      const moveLearnMethodMatched = this.moveLearnMethodPipe.transform(versionGroupMatched, moveLearnMethod);
      return {
        move: pokemonMove.move,
        // There should be only one or none matched.
        detail: moveLearnMethodMatched[0],
      };
    }).filter(x => x.detail);

    if (moveLearnMethod === "level-up") {
      result.sort((x, y) => {
        return x.detail.level_learned_at < y.detail.level_learned_at ? -1 : 1;
      });
    }

    if (result.length === 0)
      return null;

    return result;
  }

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', ability.name]);
  }

  goEggGroup(eggGroup: NamedAPIResource): void {
    this.router.navigate(['/egg-group', eggGroup.name]);
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', move.name]);
  }
}
