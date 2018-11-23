import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Move } from '../model/move';
import { Pokemon } from '../model/pokemon';
import { MoveService } from '../service/move.service';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-move-detail',
  templateUrl: './move-detail.component.html',
  styleUrls: ['./move-detail.component.css']
})
export class MoveDetailComponent implements OnInit {
  @Input() move: Move;
  pokemonList: Pokemon[];
  id: number;

  constructor(
    private moveService: MoveService,
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.pokemonList = [];
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getMove(this.id);
    });
  }

  getMove(id: number): void {
    this.moveService.getMove(id).subscribe(x => {
      this.move = x;
      this.getMovePokemons();
    });
  }

  getMovePokemons(): void {
    for (let i = 0; i < this.move.pokemon.length; i++) {
      let id = this.move.pokemon[i];
      this.pokemonService.getPokemon(+id).subscribe(x => this.pokemonList[i] = x);
    }
  }

  goMove(id: number): void {
    this.router.navigate(['/move', id]);
  }

  goPokemon(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
