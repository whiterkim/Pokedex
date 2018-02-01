import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Abality } from '../model/abality';
import { Pokemon } from '../model/pokemon';
import { AbalityService } from '../service/abality.service';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-abality-detail',
  templateUrl: './abality-detail.component.html',
  styleUrls: ['./abality-detail.component.css']
})
export class AbalityDetailComponent implements OnInit {
  @Input() abality: Abality;
  pokemonList: Pokemon[];
  id: number;

  constructor(
    private abalityService: AbalityService,
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.pokemonList = [];
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getAbality(this.id);
    });
  }

  getAbality(id: number): void {
    this.abalityService.getAbality(id).subscribe(x => {
      this.abality = x;
      this.getAbalityPokemons();
    });
  }

  getAbalityPokemons(): void {
    for (let i = 0; i < this.abality.pokemon.length; i++) {
      let id = this.abality.pokemon[i];
      this.pokemonService.getPokemon(+id).subscribe(x => this.pokemonList[i] = x);
    }
  }

  goAbality(id: number): void {
    this.router.navigate(['/abality', id]);
  }

  goPokemon(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
