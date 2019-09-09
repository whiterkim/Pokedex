import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeApiService } from '../service/pokeapi.service';
import { NamedAPIResourceList, NamedAPIResource } from '../model/utility';
import { Utility } from '../utility';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent implements OnInit {
  moveList: NamedAPIResourceList[];

  constructor(
    private router: Router,
    private pokeApiService: PokeApiService,
  ) { }

  getMoveList(): void {
    this.pokeApiService.getFromApi('https://pokeapi.co/api/v2/move/').subscribe(x => {
      console.log(x);
      this.moveList = x;
    });
  }

  ngOnInit() {
    this.getMoveList();
  }

  goMoveDetail(move: NamedAPIResource): void {
    this.router.navigate(['/move', Utility.getIDFromUrl(move.url)]);
  }
}
