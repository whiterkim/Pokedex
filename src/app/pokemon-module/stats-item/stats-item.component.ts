import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-item',
  inputs: ['header', 'value', 'key'],
  templateUrl: './stats-item.component.html',
  styleUrls: ['./stats-item.component.css']
})
export class StatsItemComponent {
  @Input()
  header: string;
  @Input()
  value: number;
  @Input()
  key: string;

  constructor() { }
}
