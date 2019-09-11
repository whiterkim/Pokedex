import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { Utility } from '../utility'
import { Pokemon, PokemonSpecies } from '../model/pokemon2';

@Component({
  selector: 'app-pokemon-list-item',
  inputs: ['key'],
  templateUrl: './pokemon-list-item.component.html'
})
export class PokemonListItemComponent implements OnInit {
  @Input()
  key: string;
  pokemon: Pokemon;
  species: PokemonSpecies;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  getImageURL = Utility.getImageURL;

  async getPokemon(): Promise<void> {
      this.pokemon = await this.pokemonService.getPokemon(this.key);
      this.species = await this.pokemonService.getSpecies(this.key);
  }

  ngOnInit() {
    this.getPokemon();
  }

  goPokemonDetail(): void {
    this.router.navigate(['/pokemon', this.key]);
  }
}
