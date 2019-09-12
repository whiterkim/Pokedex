import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MoveService } from '../service/move.service';
import { NamedAPIResourceList, NamedAPIResource } from '../model/utility';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html'
})
export class MoveListComponent implements OnInit {
  moveList: NamedAPIResourceList;

  constructor(
    private router: Router,
    private moveService: MoveService,
  ) { }

  async getMoveList(): Promise<void> {
    this.moveList = await this.moveService.getMoves();
  }

  ngOnInit() {
    this.getMoveList();
  }

  goMove(move: NamedAPIResource): void {
    this.router.navigate(['/move', move.name]);
  }
}
