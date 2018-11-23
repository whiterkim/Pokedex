import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Move } from '../model/move';
import { MoveService } from '../service/move.service';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent implements OnInit {
  moveList: Move[];

  constructor(
    private router: Router,
    private moveService: MoveService
  ) { }

  getMoveList(): void {
    this.moveService.getMoves().subscribe(x => {
      console.log(x);
      this.moveList = <Move[]>x;
    });
  }

  ngOnInit() {
    this.getMoveList();
  }

  goMoveDetail(move: Move): void {
    this.router.navigate(['/move', move.id]);
  }
}
