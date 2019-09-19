import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../service/item.service';
import { Item } from '../model/items';

@Component({
  selector: 'app-item-list-item',
  inputs: ['url'],
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.css']
})
export class ItemListItemComponent implements OnInit {
  @Input()
  url: string;
  item: Item;

  constructor(
    private router: Router,
    private itemService: ItemService
  ) { }

  async getItem(): Promise<void> {
      this.item = await this.itemService.getItem(this.url);
  }

  ngOnInit() {
    this.getItem();
  }

  goItem(): void {
    this.router.navigate(['/item', this.item.name]);
  }
}
