import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { NamedAPIResource } from '../model/utility';
import { Pokemon, PokemonSpecies } from '../model/pokemon';
import { VersionGroupPipe } from '../pipe/version-group.pipe';
import { MoveLearnMethodPipe } from '../pipe/move-learn-method.pipe';

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
  }

  getTotalStats(): number {
    return this.pokemon.stats.reduce((sum, x) => sum + x.base_stat, 0);
  }

  getMoves(moveLearnMethod: string) {
    const result = this.pokemon.moves.filter(move => {
      const versionGroupMatched = this.versionGroupPipe.transform(move.version_group_details);
      const moveLearnMethodMatched = this.moveLearnMethodPipe.transform(versionGroupMatched, moveLearnMethod);
      return moveLearnMethodMatched.length > 0;
    });

    if (result.length === 0)
      return null;

    return result;
  }

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', ability.name]);
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', move.name]);
  }
}
