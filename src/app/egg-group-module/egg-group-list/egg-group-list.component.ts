import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EggGroupService } from '../../service/egg-group.service';
import { NamedAPIResourceList, NamedAPIResource } from '../../model/utility';

@Component({
  selector: 'app-egg-group-list',
  templateUrl: './egg-group-list.component.html'
})
export class EggGroupListComponent implements OnInit {
  eggGroupList: NamedAPIResourceList;

  constructor(
    private router: Router,
    private eggGroupService: EggGroupService
  ) { }

  async getEggGroupList(): Promise<void> {
    this.eggGroupList = await this.eggGroupService.getEggGroups();
  }

  ngOnInit() {
    this.getEggGroupList();
  }

  goEggGroup(eggGroup: NamedAPIResource): void {
    this.router.navigate(['/egg-group', eggGroup.name]);
  }
}
