import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MoveService } from '../service/move.service';
import { Move } from '../model/moves';

@Component({
  selector: 'app-move-list-item',
  inputs: ['url'],
  templateUrl: './move-list-item.component.html',
  styleUrls: ['./move-list-item.component.css']
})
export class MoveListItemComponent implements OnInit {
  @Input()
  url: string;
  move: Move;

  constructor(
    private router: Router,
    private moveService: MoveService
  ) { }

  async getMove(): Promise<void> {
      this.move = await this.moveService.getMove(this.url);
  }

  ngOnInit() {
    this.getMove();
  }

  goMove(): void {
    this.router.navigate(['/move', this.move.name]);
  }
}
