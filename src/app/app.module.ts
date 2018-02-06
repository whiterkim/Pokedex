import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonService } from './service/pokemon.service';
import { AppRoutingModule } from './/app-routing.module';
import { AbilityService } from './service/ability.service';
import { AbilityDetailComponent } from './ability-detail/ability-detail.component';
import { MainComponent } from './main/main.component';
import { AbilityListComponent } from './ability-list/ability-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    AbilityDetailComponent,
    MainComponent,
    AbilityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PokemonService, AbilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
