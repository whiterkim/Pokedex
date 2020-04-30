import { Component, OnInit, Input } from '@angular/core';

import { EggGroupService } from '../service/egg-group.service';
import { EggGroup } from '../model/pokemon';

@Component({
  selector: 'app-egg-group-name',
  inputs: ['url'],
  templateUrl: './egg-group-name.component.html'
})
export class EggGroupNameComponent implements OnInit {
  @Input()
  url: string;
  eggGroup: EggGroup;

  constructor(
    private eggGroupService: EggGroupService
  ) { }

  ngOnInit(): void {
    this.getEggGroup();
  }

  async getEggGroup(): Promise<void> {
    this.eggGroup = await this.eggGroupService.getEggGroup(this.url);
  }
}
