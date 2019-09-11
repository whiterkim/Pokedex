import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';
import { PokemonDetail } from '../model/pokemon';
import { Pokemon, PokemonSpecies } from '../model/pokemon2';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonDetail;
  key: string;
  pokemon2: Pokemon;
  species: PokemonSpecies;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getImageURL = Utility.getImageURL;

  getMatchedLanguageVersion = Utility.getMatchedLanguageVersion;

  getMatchedLanguage = Utility.getMatchedLanguage;

  getIDFromUrl = Utility.getIDFromUrl;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getPokemon();
    });
  }

  async getPokemon(): Promise<void> {
    this.pokemonService.getPokemonDetail(this.key).then(x => {
      console.log(x);
      this.pokemon = x;
    });

    this.pokemon2 = await this.pokemonService.getPokemon(this.key);
    this.species = await this.pokemonService.getSpecies(this.key);
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', ability.name]);
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', move.name]);
  }
}
