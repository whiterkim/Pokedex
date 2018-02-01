import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { AbalityListComponent } from './abality-list/abality-list.component';
import { AbalityDetailComponent } from './abality-detail/abality-detail.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: 'abality-list', component: AbalityListComponent},
  {path: 'pokemon/:id', component: PokemonDetailComponent},
  {path: 'abality/:id', component: AbalityDetailComponent}
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
