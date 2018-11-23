import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pokemon } from '../model/pokemon'
import { Ability } from '../model/ability';
import { Move } from '../model/move';
import { PokemonService } from '../service/pokemon.service';
import { AbilityService } from '../service/ability.service';
import { MoveService } from '../service/move.service';

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
  levelMoves: Move[];
  tmhmMoves: Move[];
  eggMoves: Move[];
  tutorMoves: Move[];
  id: number;

  constructor(
    private pokemonService: PokemonService,
    private abilityService: AbilityService,
    private moveService: MoveService,
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
      this.getPokemonMoves();
    });
  }

  getPokemonAbalities(): void {
    this.abilityService.getAbility(this.pokemon.abilityOne).subscribe(x => this.abilityOne = x);
    this.abilityService.getAbility(this.pokemon.abilityTwo).subscribe(x => this.abilityTwo = x);
    this.abilityService.getAbility(this.pokemon.abilityHidden).subscribe(x => this.abilityHidden = x);
  }

  getPokemonMoves(): void {
    this.moveService.getMoves().subscribe(x => this.levelMoves = x.filter(x => this.pokemon.levelMoves.includes(x.id)));
    this.moveService.getMoves().subscribe(x => this.tmhmMoves = x.filter(x => this.pokemon.tmhmMoves.includes(x.id)));
    this.moveService.getMoves().subscribe(x => this.eggMoves = x.filter(x => this.pokemon.eggMoves.includes(x.id)));
    this.moveService.getMoves().subscribe(x => this.tutorMoves = x.filter(x => this.pokemon.tutorMoves.includes(x.id)));
  }

  goPokemon(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  goAbility(id: number): void {
    this.router.navigate(['/ability', id]);
  }

  goMove(id: number): void {
    this.router.navigate(['/move', id]);
  }
}
