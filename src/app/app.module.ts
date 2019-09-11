import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';

import { PokemonService } from './service/pokemon.service';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './pokemon-list-item/pokemon-list-item.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

import { AbilityService } from './service/ability.service';
import { AbilityDetailComponent } from './ability-detail/ability-detail.component';
import { AbilityListComponent } from './ability-list/ability-list.component';

import { MoveService } from './service/move.service';
import { MoveDetailComponent } from './move-detail/move-detail.component';
import { MoveListComponent } from './move-list/move-list.component';

import { PokeApiService } from './service/pokeapi.service';
import { LanguagePipe } from './pipe/language.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    PokemonDetailComponent,
    AbilityListComponent,
    AbilityDetailComponent,
    MoveListComponent,
    MoveDetailComponent,
    LanguagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokemonService, AbilityService, MoveService, PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
