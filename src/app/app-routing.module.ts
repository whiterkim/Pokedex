import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { AbilityListComponent } from './ability-list/ability-list.component';
import { AbilityDetailComponent } from './ability-detail/ability-detail.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: 'ability-list', component: AbilityListComponent},
  {path: 'pokemon/:id', component: PokemonDetailComponent},
  {path: 'ability/:id', component: AbilityDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
