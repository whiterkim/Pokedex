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

  // This order only applies to USUM.
  static machineOrder: Object = {
    'https://pokeapi.co/api/v2/move/526/': 1,
    'https://pokeapi.co/api/v2/move/337/': 2,
    'https://pokeapi.co/api/v2/move/473/': 3,
    'https://pokeapi.co/api/v2/move/347/': 4,
    'https://pokeapi.co/api/v2/move/46/': 5,
    'https://pokeapi.co/api/v2/move/92/': 6,
    'https://pokeapi.co/api/v2/move/258/': 7,
    'https://pokeapi.co/api/v2/move/339/': 8,
    'https://pokeapi.co/api/v2/move/474/': 9,
    'https://pokeapi.co/api/v2/move/237/': 10,
    'https://pokeapi.co/api/v2/move/241/': 11,
    'https://pokeapi.co/api/v2/move/269/': 12,
    'https://pokeapi.co/api/v2/move/58/': 13,
    'https://pokeapi.co/api/v2/move/59/': 14,
    'https://pokeapi.co/api/v2/move/63/': 15,
    'https://pokeapi.co/api/v2/move/113/': 16,
    'https://pokeapi.co/api/v2/move/182/': 17,
    'https://pokeapi.co/api/v2/move/240/': 18,
    'https://pokeapi.co/api/v2/move/355/': 19,
    'https://pokeapi.co/api/v2/move/219/': 20,
    'https://pokeapi.co/api/v2/move/218/': 21,
    'https://pokeapi.co/api/v2/move/76/': 22,
    'https://pokeapi.co/api/v2/move/479/': 23,
    'https://pokeapi.co/api/v2/move/85/': 24,
    'https://pokeapi.co/api/v2/move/87/': 25,
    'https://pokeapi.co/api/v2/move/89/': 26,
    'https://pokeapi.co/api/v2/move/216/': 27,
    'https://pokeapi.co/api/v2/move/141/': 28,
    'https://pokeapi.co/api/v2/move/94/': 29,
    'https://pokeapi.co/api/v2/move/247/': 30,
    'https://pokeapi.co/api/v2/move/280/': 31,
    'https://pokeapi.co/api/v2/move/104/': 32,
    'https://pokeapi.co/api/v2/move/115/': 33,
    'https://pokeapi.co/api/v2/move/482/': 34,
    'https://pokeapi.co/api/v2/move/53/': 35,
    'https://pokeapi.co/api/v2/move/188/': 36,
    'https://pokeapi.co/api/v2/move/201/': 37,
    'https://pokeapi.co/api/v2/move/126/': 38,
    'https://pokeapi.co/api/v2/move/317/': 39,
    'https://pokeapi.co/api/v2/move/332/': 40,
    'https://pokeapi.co/api/v2/move/259/': 41,
    'https://pokeapi.co/api/v2/move/263/': 42,
    'https://pokeapi.co/api/v2/move/488/': 43,
    'https://pokeapi.co/api/v2/move/156/': 44,
    'https://pokeapi.co/api/v2/move/213/': 45,
    'https://pokeapi.co/api/v2/move/168/': 46,
    'https://pokeapi.co/api/v2/move/490/': 47,
    'https://pokeapi.co/api/v2/move/496/': 48,
    'https://pokeapi.co/api/v2/move/497/': 49,
    'https://pokeapi.co/api/v2/move/315/': 50,
    'https://pokeapi.co/api/v2/move/211/': 51,
    'https://pokeapi.co/api/v2/move/411/': 52,
    'https://pokeapi.co/api/v2/move/412/': 53,
    'https://pokeapi.co/api/v2/move/206/': 54,
    'https://pokeapi.co/api/v2/move/503/': 55,
    'https://pokeapi.co/api/v2/move/374/': 56,
    'https://pokeapi.co/api/v2/move/451/': 57,
    'https://pokeapi.co/api/v2/move/507/': 58,
    'https://pokeapi.co/api/v2/move/693/': 59,
    'https://pokeapi.co/api/v2/move/511/': 60,
    'https://pokeapi.co/api/v2/move/261/': 61,
    'https://pokeapi.co/api/v2/move/512/': 62,
    'https://pokeapi.co/api/v2/move/373/': 63,
    'https://pokeapi.co/api/v2/move/153/': 64,
    'https://pokeapi.co/api/v2/move/421/': 65,
    'https://pokeapi.co/api/v2/move/371/': 66,
    'https://pokeapi.co/api/v2/move/684/': 67,
    'https://pokeapi.co/api/v2/move/416/': 68,
    'https://pokeapi.co/api/v2/move/397/': 69,
    'https://pokeapi.co/api/v2/move/694/': 70,
    'https://pokeapi.co/api/v2/move/444/': 71,
    'https://pokeapi.co/api/v2/move/521/': 72,
    'https://pokeapi.co/api/v2/move/86/': 73,
    'https://pokeapi.co/api/v2/move/360/': 74,
    'https://pokeapi.co/api/v2/move/14/': 75,
    'https://pokeapi.co/api/v2/move/19/': 76,
    'https://pokeapi.co/api/v2/move/244/': 77,
    'https://pokeapi.co/api/v2/move/523/': 78,
    'https://pokeapi.co/api/v2/move/524/': 79,
    'https://pokeapi.co/api/v2/move/157/': 80,
    'https://pokeapi.co/api/v2/move/404/': 81,
    'https://pokeapi.co/api/v2/move/525/': 82,
    'https://pokeapi.co/api/v2/move/611/': 83,
    'https://pokeapi.co/api/v2/move/398/': 84,
    'https://pokeapi.co/api/v2/move/138/': 85,
    'https://pokeapi.co/api/v2/move/447/': 86,
    'https://pokeapi.co/api/v2/move/207/': 87,
    'https://pokeapi.co/api/v2/move/214/': 88,
    'https://pokeapi.co/api/v2/move/369/': 89,
    'https://pokeapi.co/api/v2/move/164/': 90,
    'https://pokeapi.co/api/v2/move/430/': 91,
    'https://pokeapi.co/api/v2/move/433/': 92,
    'https://pokeapi.co/api/v2/move/528/': 93,
    'https://pokeapi.co/api/v2/move/57/': 94,
    'https://pokeapi.co/api/v2/move/555/': 95,
    'https://pokeapi.co/api/v2/move/267/': 96,
    'https://pokeapi.co/api/v2/move/399/': 97,
    'https://pokeapi.co/api/v2/move/127/': 98,
    'https://pokeapi.co/api/v2/move/605/': 99,
    'https://pokeapi.co/api/v2/move/590/': 100,
  };

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
      this.asyncInit();
    });
  }

  async asyncInit(): Promise<void> {
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

  private getMoves(moveLearnMethod: string) {
    let result = this.pokemon.moves.map(pokemonMove => {
      const versionGroupMatched = this.versionGroupPipe.transform(pokemonMove.version_group_details);
      const moveLearnMethodMatched = this.moveLearnMethodPipe.transform(versionGroupMatched, moveLearnMethod);

      // There should be only one or none matched.
      if (moveLearnMethodMatched.length > 0) {
        return {
          move: pokemonMove.move,
          level_learned_at: moveLearnMethodMatched[0].level_learned_at,
        };
      }

      return null;
    }).filter(x => x !== null);

    if (moveLearnMethod === "level-up") {
      result.sort((x, y) => {
        // When moveLearnMethod === "level-up", while level_learned_at === 0, this represents this
        // move is learned when evolve. Here set to 1.5, which 1 < 1.5 < others to place it in the
        // correct order.
        let xLevel = x.level_learned_at === 0 ? 1.5 : x.level_learned_at;
        let yLevel = y.level_learned_at === 0 ? 1.5 : y.level_learned_at;
        return xLevel - yLevel;
      });
    } else if (moveLearnMethod === "machine") {
      result.sort((x, y) => PokemonDetailComponent.machineOrder[x.move.url] - PokemonDetailComponent.machineOrder[y.move.url]);
    }

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

  getMaxMoveIndex(): number[] {
    let max: number = this.levelUpMoves.length;
    max = Math.max(max, this.machineMoves.length);
    max = Math.max(max, this.eggMoves.length);
    max = Math.max(max, this.tutorMoves.length);
    return Array(max).fill(0).map((x, i) => i);
  }
}
