import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbilityService } from '../service/ability.service';
import { Ability } from '../model/pokemon';
import { NamedAPIResource } from '../model/utility';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {
  ability: Ability;
  key: string;

  constructor(
    private abilityService: AbilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getAbility(this.key);
    });
  }

  async getAbility(key: string): Promise<void> {
    var url = "https://pokeapi.co/api/v2/ability/" + key + "/";
    this.ability = await this.abilityService.getAbility(url);
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
