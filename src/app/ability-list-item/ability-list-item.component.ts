import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AbilityService } from '../service/ability.service';
import { Ability } from '../model/pokemon';

@Component({
  selector: 'app-ability-list-item',
  inputs: ['url'],
  templateUrl: './ability-list-item.component.html',
  styleUrls: ['./ability-list-item.component.css']
})
export class AbilityListItemComponent implements OnInit {
  @Input()
  url: string;
  ability: Ability;

  constructor(
    private router: Router,
    private abilityService: AbilityService
  ) { }

  async getAbility(): Promise<void> {
      this.ability = await this.abilityService.getAbility(this.url);
  }

  ngOnInit() {
    this.getAbility();
  }

  goAbility(): void {
    this.router.navigate(['/ability', this.ability.name]);
  }
}
