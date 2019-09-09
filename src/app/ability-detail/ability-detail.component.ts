import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokeApiService } from '../service/pokeapi.service';
import { Ability } from '../model/pokemon2';
import { Utility } from '../utility';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {
  @Input() ability: Ability;
  id: number;

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getMatchedLanguageVersion = Utility.getMatchedLanguageVersion;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getAbility(this.id);
    });
  }

  getAbility(id: number): void {
    var url = "https://pokeapi.co/api/v2/ability/" + id + "/";
    this.pokeApiService.getFromApi(url).subscribe(x => {
      this.ability = x;
      this.getAbilityPokemons();
    });
  }

  getAbilityPokemons(): void {
    for (let i = 0; i < this.ability.pokemon.length; i++) {
      let id = this.ability.pokemon[i];
    }
  }

  goAbility(id: number): void {
    this.router.navigate(['/ability', id]);
  }

  goPokemon(url: string): void {
    this.router.navigate(['/pokemon', Utility.getIDFromUrl(url)]);
  }
}
