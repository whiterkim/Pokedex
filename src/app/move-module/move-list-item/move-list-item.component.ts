import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../../service/item.service';
import { MoveService } from '../../service/move.service';
import { Item } from '../../model/items';
import { Move } from '../../model/moves';
import { VersionGroupPipe } from '../../pipe/version-group.pipe';

@Component({
  selector: 'app-move-list-item',
  templateUrl: './move-list-item.component.html',
  styleUrls: ['./move-list-item.component.css'],
  providers: [VersionGroupPipe],
})
export class MoveListItemComponent implements OnInit {
  @Input()
  url: string;
  @Input()
  method: string;
  @Input()
  level: number

  move: Move;
  machineItem: Item;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private moveService: MoveService,
    private versionGroupPipe: VersionGroupPipe,
  ) { }

  async getMove(): Promise<void> {
    this.move = await this.moveService.getMove(this.url);

    if (this.method === "machine") {
      let url = this.versionGroupPipe.transform(this.move.machines)[0].machine.url;
      let machine = await this.moveService.getMachine(url);
      this.machineItem = await this.itemService.getItem(machine.item.url);
    }
  }

  ngOnInit() {
    this.getMove();
  }

  goMove(): void {
    this.router.navigate(['/move', this.move.name]);
  }

  getLevelInfo(): string {
    if (this.level === 0) {
      return "Evo.";
    } else if (this.level === 1) {
      return "-";
    }

    return "Lv." + this.level;
  }
}
