import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pokemon } from '../model/pokemon'
import { Ability } from '../model/ability';
import { PokemonService } from '../service/pokemon.service';
import { AbilityService } from '../service/ability.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;
  abilityOne: Ability;
  abilityTwo: Ability;
  abilityHidden: Ability;
  id: number;

  constructor(
    private pokemonService: PokemonService,
    private abilityService: AbilityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getPokemon(this.id);
    });
  }

  getPokemon(id: number): void {
    this.pokemonService.getPokemon(id).subscribe(x => {
      this.pokemon = x;
      this.getPokemonAbalities();
    });
  }

  getPokemonAbalities(): void {
    this.abilityService.getAbility(this.pokemon.abilityOne).subscribe(x => this.abilityOne = x);
    this.abilityService.getAbility(this.pokemon.abilityTwo).subscribe(x => this.abilityTwo = x);
    this.abilityService.getAbility(this.pokemon.abilityHidden).subscribe(x => this.abilityHidden = x);
  }

  goPokemon(id: number): void {
    this.router.navigate(['/pokemon', id])
  }

  goAbility(id: number): void {
    this.router.navigate(['/ability', id])
  }
}
