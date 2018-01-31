import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../model/pokemon'
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(x => this.pokemons = x);
  }

  ngOnInit() {
    this.getPokemons();
  }

  gotoPokemonDetail(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.router.navigate(['/pokemon', this.selectedPokemon.id])
  }
}
