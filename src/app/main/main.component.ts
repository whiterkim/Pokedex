import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    let baseUrl = "https://pokeapi.co/api/v2/";
    for (let i = 1; i <= 5; i++) {
      await this.apiService.get(baseUrl + 'item/' + i.toString());
    }
    this.router.navigate(['/pokemon-list']);
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
