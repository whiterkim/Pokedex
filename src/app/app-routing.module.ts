import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PokemonListComponent } from './pokemon-module/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-module/pokemon-detail/pokemon-detail.component';
import { AbilityListComponent } from './ability-module/ability-list/ability-list.component';
import { AbilityDetailComponent } from './ability-module/ability-detail/ability-detail.component';
import { MoveListComponent } from './move-module/move-list/move-list.component';
import { MoveDetailComponent } from './move-module/move-detail/move-detail.component';
import { ItemListComponent } from './item-module/item-list/item-list.component';
import { ItemDetailComponent } from './item-module/item-detail/item-detail.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: 'ability-list', component: AbilityListComponent},
  {path: 'item-list', component: ItemListComponent},
  {path: 'move-list', component: MoveListComponent},
  {path: 'pokemon/:key', component: PokemonDetailComponent},
  {path: 'ability/:key', component: AbilityDetailComponent},
  {path: 'item/:key', component: ItemDetailComponent},
  {path: 'move/:key', component: MoveDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
  })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
