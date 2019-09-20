import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../service/pokemon.service';
import { NamedAPIResourceList } from '../model/utility';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: NamedAPIResourceList;

  constructor(
    private pokemonService: PokemonService
  ) { }

  async ngOnInit():Promise<void> {
    this.pokemonList = await this.pokemonService.getPokemonList();
  }

  onClick($event) {
    let percentage = $event.offsetY / $event.srcElement.clientHeight;
    let scrollToNumber = 151 * percentage;
    window.scrollTo(0, 37 * scrollToNumber);
    console.log(percentage, scrollToNumber);
  }

  onSwipe($event) {
    console.log($event);
  }
}
