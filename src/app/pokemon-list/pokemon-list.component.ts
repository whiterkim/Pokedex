import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { Utility } from '../utility'
import { PokemonBasis } from '../model/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonBasis[];
  data: Object;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  getImageURL = Utility.getImageURL;

  getIDFromUrl = Utility.getIDFromUrl;

  async getPokemonList(): Promise<void> {
    let pokemonListFromApi = await this.pokemonService.getPokemonList();

    this.pokemonList = [];
    for (let pokemonFromApi of pokemonListFromApi.results) {
      this.pokemonList.push(await this.pokemonService.getPokemonBasis(pokemonFromApi.name));
    }
  }

  ngOnInit() {
    this.getPokemonList();
  }

  goPokemonDetail(pokemon: PokemonBasis): void {
    this.router.navigate(['/pokemon', pokemon.key]);
  }
}
