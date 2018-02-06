import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ability } from '../model/ability';
import { Pokemon } from '../model/pokemon';
import { AbilityService } from '../service/ability.service';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-ability-detail',
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {
  @Input() ability: Ability;
  pokemonList: Pokemon[];
  id: number;

  constructor(
    private abilityService: AbilityService,
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.pokemonList = [];
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getAbility(this.id);
    });
  }

  getAbility(id: number): void {
    this.abilityService.getAbility(id).subscribe(x => {
      this.ability = x;
      this.getAbilityPokemons();
    });
  }

  getAbilityPokemons(): void {
    for (let i = 0; i < this.ability.pokemon.length; i++) {
      let id = this.ability.pokemon[i];
      this.pokemonService.getPokemon(+id).subscribe(x => this.pokemonList[i] = x);
    }
  }

  goAbility(id: number): void {
    this.router.navigate(['/ability', id]);
  }

  goPokemon(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
