import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokeApiService } from '../service/pokeapi.service';
import { Ability } from '../model/pokemon2';
import { Utility } from '../utility';
import { NamedAPIResource } from '../model/utility';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {
  @Input() ability: Ability;
  key: string;

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getAbility(this.key);
    });
  }

  getAbility(key: string): void {
    var url = "https://pokeapi.co/api/v2/ability/" + key + "/";
    this.pokeApiService.getFromApi(url).subscribe(x => {
      this.ability = x;
    });
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
