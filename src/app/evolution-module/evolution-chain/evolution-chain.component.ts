import { Component, OnInit, Input } from '@angular/core';

import { PokemonService } from '../../service/pokemon.service';
import { EvolutionChain, ChainLink } from '../../model/evolution';

@Component({
  selector: 'app-evolution-chain',
  inputs: ['url'],
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})
export class EvolutionChainComponent implements OnInit {
  @Input()
  url: string;
  evolutionChain: EvolutionChain;
  evolutionLists: ChainLink[][] = [];

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.getEvolutionChain();
  }

  private dfs(node: ChainLink, currentChain: ChainLink[]): void {
    if (node.evolves_to.length === 0) {
      this.evolutionLists.push(Object.assign([], currentChain));
      return;
    }

    for (let i = 0; i < node.evolves_to.length; i++) {
      currentChain.push(node.evolves_to[i]);

      this.dfs(node.evolves_to[i], currentChain);
      currentChain.pop();
    }
  }

  private async getEvolutionChain(): Promise<void> {
    this.evolutionChain = await this.pokemonService.getEvolutionChain(this.url);

    this.dfs(this.evolutionChain.chain, [this.evolutionChain.chain]);
  }
}
