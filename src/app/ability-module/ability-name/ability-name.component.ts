import { Component, OnInit, Input } from '@angular/core';

import { AbilityService } from '../../service/ability.service';
import { Ability } from '../../model/pokemon';

@Component({
  selector: 'app-ability-name',
  inputs: ['url', 'isHidden'],
  templateUrl: './ability-name.component.html',
  styleUrls: ['./ability-name.component.css']
})
export class AbilityNameComponent implements OnInit {
  @Input()
  url: string;
  @Input()
  isHidden: string;
  ability: Ability;

  constructor(
    private abilityService: AbilityService
  ) { }

  ngOnInit(): void {
    this.getAbility();
  }

  async getAbility(): Promise<void> {
    this.ability = await this.abilityService.getAbility(this.url);
  }
}
