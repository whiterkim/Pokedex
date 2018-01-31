import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../model/pokemon'
import { Abality } from '../model/abality';
import { PokemonService } from '../service/pokemon.service';
import { AbalityService } from '../service/abality.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;
  abalityOne: Abality;
  abalityTwo: Abality;
  abalityHidden: Abality;
  id: number;

  constructor(
    private pokemonService: PokemonService,
    private abalityService: AbalityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getPokemon(this.id);
      this.getAbalities();
    });
  }

  getPokemon(id: number): void {
    this.pokemonService.getPokemon(id).subscribe(x => this.pokemon = x);
  }

  getAbalities(): void {
    console.log(this.pokemon.abalityOne);
    console.log(this.pokemon.abalityTwo != 0);
    console.log(this.pokemon.abalityHidden);
    this.abalityService.getAbality(this.pokemon.abalityOne).subscribe(x => this.abalityOne = x);
    this.abalityService.getAbality(this.pokemon.abalityTwo).subscribe(x => this.abalityTwo = x);
    this.abalityService.getAbality(this.pokemon.abalityHidden).subscribe(x => this.abalityHidden = x);
  }

  goPokemon(id: number):void {
    this.router.navigate(['/pokemon', id])
  }

  goHome(): void {
    this.router.navigate(['/'])
  }
  goBack(): void {
    this.location.back()
  }
}
