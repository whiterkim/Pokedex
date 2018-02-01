import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Abality } from '../model/abality';
import { AbalityService } from '../service/abality.service';

@Component({
  selector: 'app-abality-list',
  templateUrl: './abality-list.component.html',
  styleUrls: ['./abality-list.component.css']
})
export class AbalityListComponent implements OnInit {
  abalityList: Abality[];

  constructor(
    private router: Router,
    private abalityService: AbalityService
  ) { }

  getAbalityList(): void {
    this.abalityService.getAbalities().subscribe(x => this.abalityList = x);
  }

  ngOnInit() {
    this.getAbalityList();
  }

  goAbalityDetail(abality: Abality): void {
    this.router.navigate(['/abality', abality.id])
  }
}
