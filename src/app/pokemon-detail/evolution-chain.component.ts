import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { NamedAPIResource } from '../model/utility';
import { EvolutionChain, ChainLink } from '../model/evolution';
import { Utility } from '../utility';

@Component({
  selector: 'app-evolution-chain',
  inputs: ['url'],
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class EvolutionChainComponent implements OnInit {
  @Input()
  url: string;
  evolutionChain: EvolutionChain;
  evolutionList: ChainLink[];

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  getImageURL = Utility.getImageURL;
  getIDFromUrl = Utility.getIDFromUrl;

  ngOnInit(): void {
    this.getEvolutionChain();
  }

  async getEvolutionChain(): Promise<void> {
    this.evolutionChain = await this.pokemonService.getEvolutionChain(this.url);

    // Convert evolution tree into a simple list, only the first child is considered.
    // TODO: use the evolution tree correctly.
    this.evolutionList = [];
    for (let current_node = this.evolutionChain.chain; current_node; current_node = current_node.evolves_to[0]) {
      this.evolutionList.push(current_node);
    }
    console.log(this.evolutionList);
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
