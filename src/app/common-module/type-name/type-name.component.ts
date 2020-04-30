import { Component, OnInit, Input } from '@angular/core';

import { TypeService } from '../../service/type.service';
import { Type } from '../../model/pokemon';

@Component({
  selector: 'app-type-name',
  inputs: ['url'],
  templateUrl: './type-name.component.html',
  styleUrls: ['./type-name.component.css']
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
    this.type = await this.typeService.getType(this.url);
  }
}
