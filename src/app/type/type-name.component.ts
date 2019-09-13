import { Component, OnInit, Input } from '@angular/core';

import { TypeService } from '../service/type.service';
import { Type } from '../model/pokemon2';

@Component({
  selector: 'app-type-name',
  inputs: ['url'],
  templateUrl: './type-name.component.html'
})
export class TypeNameComponent implements OnInit {
  @Input()
  url: string;
  type: Type;

  constructor(
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    this.getType();
  }

  async getType(): Promise<void> {
    console.log(this.url);
    this.type = await this.typeService.getType(this.url);
    console.log(this.type);
  }
}
