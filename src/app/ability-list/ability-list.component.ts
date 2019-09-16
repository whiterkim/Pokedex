import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbilityService } from '../service/ability.service';
import { NamedAPIResourceList, NamedAPIResource } from '../model/utility';

@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.css']
})
export class AbilityListComponent implements OnInit {
  abilityList: NamedAPIResourceList;

  constructor(
    private router: Router,
    private abilityService: AbilityService
  ) { }

  async getAbilityList(): Promise<void> {
    this.abilityList = await this.abilityService.getAbilities();
  }

  ngOnInit() {
    this.getAbilityList();
  }

  goAbility(ability: NamedAPIResource): void {
    this.router.navigate(['/ability', ability.name]);
  }
}
