import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EggGroupService } from '../../service/egg-group.service';
import { EggGroup } from '../../model/pokemon';
import { NamedAPIResource } from '../../model/utility';

@Component({
  selector: 'app-egg-group-detail',
  templateUrl: './egg-group-detail.component.html'
})
export class EggGroupDetailComponent implements OnInit {
  eggGroup: EggGroup;
  key: string;

  constructor(
    private eggGroupService: EggGroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getEggGroup(this.key);
    });
  }

  async getEggGroup(key: string): Promise<void> {
    var url = "https://pokeapi.co/api/v2/egg-group/" + key + "/";
    this.eggGroup = await this.eggGroupService.getEggGroup(url);
  }

  goPokemon(pokemon: NamedAPIResource): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
