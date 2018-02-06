import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ability } from '../model/ability';
import { AbilityService } from '../service/ability.service';

@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.css']
})
export class AbilityListComponent implements OnInit {
  abilityList: Ability[];

  constructor(
    private router: Router,
    private abilityService: AbilityService
  ) { }

  getAbilityList(): void {
    this.abilityService.getAbalities().subscribe(x => this.abilityList = x);
  }

  ngOnInit() {
    this.getAbilityList();
  }

  goAbilityDetail(ability: Ability): void {
    this.router.navigate(['/ability', ability.id])
  }
}
