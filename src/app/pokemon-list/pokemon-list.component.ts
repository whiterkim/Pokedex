import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { Utility } from '../utility'
import { NamedAPIResourceList, NamedAPIResource } from '../model/utility';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: NamedAPIResourceList[];
  data: Object;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  getImageURL = Utility.getImageURL;

  getIDFromUrl = Utility.getIDFromUrl;

  getPokemonList(): void {
    this.pokemonService.getPokemonList().then(x => {
      console.log(x);
      this.pokemonList = x;
    });
  }

  ngOnInit() {
    this.getPokemonList();
  }

  goPokemonDetail(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', Utility.getIDFromUrl(pokemon.url)]);
  }
}
