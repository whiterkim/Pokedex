import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeApiService } from '../service/pokeapi.service';
import { NamedAPIResourceList, NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';

@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.css']
})
export class AbilityListComponent implements OnInit {
  abilityList: NamedAPIResourceList[];

  constructor(
    private router: Router,
    private pokeApiService: PokeApiService
  ) { }

  getAbilityList(): void {
    this.pokeApiService.getFromApi('https://pokeapi.co/api/v2/ability/').subscribe(x => {
      this.abilityList = x;
    });
  }

  ngOnInit() {
    this.getAbilityList();
  }

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', ability.name]);
  }
}
