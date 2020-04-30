import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../../service/pokemon.service';
import { Pokemon, PokemonSpecies } from '../../model/pokemon';

@Component({
  selector: 'app-pokemon-list-item',
  inputs: ['url'],
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
  @Input()
  url: string;
  pokemon: Pokemon;
  species: PokemonSpecies;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  async getPokemon(): Promise<void> {
      this.pokemon = await this.pokemonService.getPokemon(this.url);
      this.species = await this.pokemonService.getSpecies(this.pokemon.species.url);
  }

  ngOnInit() {
    this.getPokemon();
  }

  goPokemonDetail(): void {
    this.router.navigate(['/pokemon', this.pokemon.name]);
  }
}
