import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../../service/pokemon.service';
import { NamedAPIResourceList } from '../../model/utility';
import { isProdMode } from '../../../main';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent implements OnInit {
  pokemonList: NamedAPIResourceList;
  mock: number[];

  constructor(
    private pokemonService: PokemonService
  ) { }

  async ngOnInit():Promise<void> {
    this.pokemonList = await this.pokemonService.getPokemonList();
    this.mock = [];
    if (!isProdMode()) {
      for (let i = 152; i <= 1008; i++) {
        this.mock.push(i);
      }
    }
  }
}
