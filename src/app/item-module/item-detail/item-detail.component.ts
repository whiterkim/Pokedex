import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemService } from '../../service/item.service';
import { Item } from '../../model/items';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  key: string;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getItem(this.key);
    });
  }

  async getItem(key: string): Promise<void> {
    var url = "https://pokeapi.co/api/v2/item/" + key + "/";
    this.item = await this.itemService.getItem(url);
  }
}
