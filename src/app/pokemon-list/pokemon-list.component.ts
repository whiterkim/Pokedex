import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../service/pokemon.service';
import { Utility } from '../utility'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[];
  data: Object;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  getPokemonList(): void {
    this.pokemonService.getPokemonList().subscribe(x => {
      console.log(x);
      this.pokemonList = <Pokemon[]>x;
    });
  }

  ngOnInit() {
    this.getPokemonList();
  }

  goPokemonDetail(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  getTypeName(id: number): string {
    return Utility.getTypeName(id);
  }

  getImageURL(folder:string, id:number): string {
    return Utility.getImageURL(folder, id);
  }
}
