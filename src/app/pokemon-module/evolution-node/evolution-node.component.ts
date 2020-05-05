import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../../service/pokemon.service';
import { NamedAPIResource } from '../../model/utility';
import { PokemonSpeciesVariety } from '../../model/pokemon';

@Component({
  selector: 'app-evolution-node',
  inputs: ['url'],
  templateUrl: './evolution-node.component.html',
  styleUrls: ['./evolution-node.component.css']
})
export class EvolutionNodeComponent implements OnInit {
  @Input()
  url: string;
  varieties: PokemonSpeciesVariety[];

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVarieties();
  }

  async getVarieties(): Promise<void> {
    let species = await this.pokemonService.getSpecies(this.url);
    this.varieties = species.varieties;
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
