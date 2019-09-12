import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';
import { Pokemon, PokemonSpecies } from '../model/pokemon2';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  key: string;
  pokemon: Pokemon;
  species: PokemonSpecies;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getImageURL = Utility.getImageURL;

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

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', ability.name]);
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', move.name]);
  }
}
