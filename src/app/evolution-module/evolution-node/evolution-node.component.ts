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
    let varieties = species.varieties;

    let ignoreList = [
      "pikachu-rock-star",
      "pikachu-belle",
      "pikachu-pop-star",
      "pikachu-phd",
      "pikachu-libre",
      "pikachu-cosplay",
      "pikachu-original-cap",
      "pikachu-hoenn-cap",
      "pikachu-sinnoh-cap",
      "pikachu-unova-cap",
      "pikachu-kalos-cap",
      "pikachu-alola-cap",
      "pikachu-partner-cap",
      "pikachu-world-cap",

      "pikachu-starter",
      "eevee-starter",
    ];

    this.varieties = [];
    for (let variety of varieties) {
      if (!ignoreList.includes(variety.pokemon.name)) {
        this.varieties.push(variety)
      }
    }
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
