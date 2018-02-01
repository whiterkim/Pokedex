import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonService } from './service/pokemon.service';
import { AppRoutingModule } from './/app-routing.module';
import { AbalityService } from './service/abality.service';
import { AbalityDetailComponent } from './abality-detail/abality-detail.component';
import { MainComponent } from './main/main.component';
import { AbalityListComponent } from './abality-list/abality-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    AbalityDetailComponent,
    MainComponent,
    AbalityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PokemonService, AbalityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
