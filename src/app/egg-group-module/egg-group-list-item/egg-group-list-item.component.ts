import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EggGroupService } from '../../service/egg-group.service';
import { EggGroup } from '../../model/pokemon';

@Component({
  selector: 'app-egg-group-list-item',
  inputs: ['url'],
  templateUrl: './egg-group-list-item.component.html',
  styleUrls: ['./egg-group-list-item.component.css']
})
export class EggGroupListItemComponent implements OnInit {
  @Input()
  url: string;
  eggGroup: EggGroup;

  constructor(
    private router: Router,
    private eggGroupService: EggGroupService
  ) { }

  async getEggGroup(): Promise<void> {
      this.eggGroup = await this.eggGroupService.getEggGroup(this.url);
  }

  ngOnInit() {
    this.getEggGroup();
  }

  goEggGroup(): void {
    this.router.navigate(['/egg-group', this.eggGroup.name]);
  }
}
