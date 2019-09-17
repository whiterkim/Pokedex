import { Component, OnInit, Input } from '@angular/core';

import { MoveService } from '../service/move.service';
import { MoveDamageClass } from '../model/moves';

@Component({
  selector: 'app-move-category-name',
  inputs: ['url'],
  templateUrl: './move-category-name.component.html',
  styleUrls: ['./move-category-name.component.css']
})
export class MoveCategoryNameComponent implements OnInit {
  @Input()
  url: string;
  moveDamageClass: MoveDamageClass;

  constructor(
    private moveService: MoveService
  ) { }

  ngOnInit(): void {
    this.getMoveCategoryName();
  }

  async getMoveCategoryName(): Promise<void> {
    this.moveDamageClass = await this.moveService.getMoveDamageClass(this.url);
  }
}
