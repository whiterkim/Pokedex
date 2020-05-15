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
    'work-up': 1,
    'dragon-claw': 2,
    'psyshock': 3,
    'calm-mind': 4,
    'roar': 5,
    'toxic': 6,
    'hail': 7,
    'bulk-up': 8,
    'venoshock': 9,
    'hidden-power': 10,
    'sunny-day': 11,
    'taunt': 12,
    'ice-beam': 13,
    'blizzard': 14,
    'hyper-beam': 15,
    'light-screen': 16,
    'protect': 17,
    'rain-dance': 18,
    'roost': 19,
    'safeguard': 20,
    'frustration': 21,
    'solar-beam': 22,
    'smack-down': 23,
    'thunderbolt': 24,
    'thunder': 25,
    'earthquake': 26,
    'return': 27,
    'leech-life': 28,
    'psychic': 29,
    'shadow-ball': 30,
    'brick-break': 31,
    'double-team': 32,
    'reflect': 33,
    'sludge-wave': 34,
    'flamethrower': 35,
    'sludge-bomb': 36,
    'sandstorm': 37,
    'fire-blast': 38,
    'rock-tomb': 39,
    'aerial-ace': 40,
    'torment': 41,
    'facade': 42,
    'flame-charge': 43,
    'rest': 44,
    'attract': 45,
    'thief': 46,
    'low-sweep': 47,
    'round': 48,
    'echoed-voice': 49,
    'overheat': 50,
    'steel-wing': 51,
    'focus-blast': 52,
    'energy-ball': 53,
    'false-swipe': 54,
    'scald': 55,
    'fling': 56,
    'charge-beam': 57,
    'sky-drop': 58,
    'brutal-swing': 59,
    'quash': 60,
    'will-o-wisp': 61,
    'acrobatics': 62,
    'embargo': 63,
    'explosion': 64,
    'shadow-claw': 65,
    'payback': 66,
    'smart-strike': 67,
    'giga-impact': 68,
    'rock-polish': 69,
    'aurora-veil': 70,
    'stone-edge': 71,
    'volt-switch': 72,
    'thunder-wave': 73,
    'gyro-ball': 74,
    'swords-dance': 75,
    'fly': 76,
    'psych-up': 77,
    'bulldoze': 78,
    'frost-breath': 79,
    'rock-slide': 80,
    'x-scissor': 81,
    'dragon-tail': 82,
    'infestation': 83,
    'poison-jab': 84,
    'dream-eater': 85,
    'grass-knot': 86,
    'swagger': 87,
    'sleep-talk': 88,
    'u-turn': 89,
    'substitute': 90,
    'flash-cannon': 91,
    'trick-room': 92,
    'wild-charge': 93,
    'surf': 94,
    'snarl': 95,
    'nature-power': 96,
    'dark-pulse': 97,
    'waterfall': 98,
    'dazzling-gleam': 99,
    'confide': 100,
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
      result.sort((x, y) => {
        return PokemonDetailComponent.machineOrder[x.move.name] -
               PokemonDetailComponent.machineOrder[y.move.name]
      });
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
