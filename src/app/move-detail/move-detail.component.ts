import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Move } from '../model/moves';
import { PokeApiService } from '../service/pokeapi.service';

@Component({
  selector: 'app-move-detail',
  templateUrl: './move-detail.component.html',
  styleUrls: ['./move-detail.component.css']
})
export class MoveDetailComponent implements OnInit {
  @Input() move: Move;
  id: number;

  constructor(
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getMove(this.id);
    });
  }

  getMove(id: number): void {
    var url = "https://pokeapi.co/api/v2/move/" + id + "/"
    this.pokeApiService.getFromApi(url).subscribe(x => {
      this.move = x;
    });
  }


  goMove(id: number): void {
    this.router.navigate(['/move', id]);
  }
}
