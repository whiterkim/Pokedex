import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonService } from '../service/pokemon.service';
import { NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  id: number;

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
      this.id = +params['id'];
      this.getPokemon();
    });
  }

  getPokemon(): void {
    this.pokemonService.getPokemonDetail(this.id).then(x => {
      console.log(x);
      this.pokemon = x;
    });
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', Utility.getIDFromUrl(pokemon.url)]);
  }

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', Utility.getIDFromUrl(ability.url)]);
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', Utility.getIDFromUrl(move.url)]);
  }
}
