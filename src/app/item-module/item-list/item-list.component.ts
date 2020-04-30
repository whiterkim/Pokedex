import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../../service/item.service';
import { NamedAPIResourceList, NamedAPIResource } from '../../model/utility';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemList: NamedAPIResourceList;

  constructor(
    private router: Router,
    private itemService: ItemService
  ) { }

  async getItemList(): Promise<void> {
    this.itemList = await this.itemService.getItemList();
  }

  ngOnInit() {
    this.getItemList();
  }

  goItem(item: NamedAPIResource): void {
    this.router.navigate(['/item', item.name]);
  }
}
