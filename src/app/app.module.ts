import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
// Controller
import { AbilityDetailComponent } from './ability-module/ability-detail/ability-detail.component';
import { AbilityListComponent } from './ability-module/ability-list/ability-list.component';
import { AbilityListItemComponent } from './ability-module/ability-list-item/ability-list-item.component';
import { AbilityNameComponent } from './ability-module/ability-name/ability-name.component';
import { EggGroupNameComponent } from './pokemon-module/egg-group-name/egg-group-name.component';
import { EvolutionChainComponent } from './pokemon-module/evolution-chain/evolution-chain.component';
import { EvolutionNodeComponent } from './pokemon-module/evolution-node/evolution-node.component';
import { ImageComponent } from './common-module/image/image.component';
import { ItemDetailComponent } from './item-module/item-detail/item-detail.component';
import { ItemListComponent } from './item-module/item-list/item-list.component';
import { ItemListItemComponent } from './item-module/item-list-item/item-list-item.component';
import { MoveCategoryNameComponent } from './move-module/move-category-name/move-category-name.component';
import { MoveDetailComponent } from './move-module/move-detail/move-detail.component';
import { MoveListComponent } from './move-module/move-list/move-list.component';
import { MoveListItemComponent } from './move-module/move-list-item/move-list-item.component';
import { PokemonDetailComponent } from './pokemon-module/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-module/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './pokemon-module/pokemon-list-item/pokemon-list-item.component';
import { QuickNavigationComponent } from './pokemon-module/quick-navigation/quick-navigation.component';
import { StatsItemComponent } from './pokemon-module/stats-item/stats-item.component';
import { TypeNameComponent } from './common-module/type-name/type-name.component';
// Service
import { AbilityService } from './service/ability.service';
import { ApiService } from './service/api.service';
import { EggGroupService } from './service/egg-group.service';
import { ItemService } from './service/item.service';
import { MoveService } from './service/move.service';
import { PokemonService } from './service/pokemon.service';
import { TypeService } from './service/type.service';
// Pipe
import { GenderRatePipe } from './pipe/gender-rate.pipe';
import { LanguagePipe } from './pipe/language.pipe';
import { MoveLearnMethodPipe } from './pipe/move-learn-method.pipe';
import { SlotPipe } from './pipe/slot.pipe';
import { StatsPipe } from './pipe/stats.pipe';
import { VersionGroupPipe } from './pipe/version-group.pipe';
import { VersionPipe } from './pipe/version.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    // Controller
    AbilityDetailComponent,
    AbilityListComponent,
    AbilityListItemComponent,
    AbilityNameComponent,
    EggGroupNameComponent,
    EvolutionChainComponent,
    EvolutionNodeComponent,
    ImageComponent,
    ItemDetailComponent,
    ItemListComponent,
    ItemListItemComponent,
    MoveCategoryNameComponent,
    MoveDetailComponent,
    MoveListComponent,
    MoveListItemComponent,
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    QuickNavigationComponent,
    StatsItemComponent,
    TypeNameComponent,
    // Pipe
    GenderRatePipe,
    LanguagePipe,
    MoveLearnMethodPipe,
    SlotPipe,
    StatsPipe,
    VersionGroupPipe,
    VersionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AbilityService, ApiService, EggGroupService, ItemService, MoveService, PokemonService, TypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
