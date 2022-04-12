import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from '../../service/api.service';
import { ItemService } from '../../service/item.service';
import { MoveService } from '../../service/move.service';
import { TypeService } from '../../service/type.service';
import { PokemonService } from '../../service/pokemon.service';
import { ChainLink, EvolutionDetail, EvolutionCondition } from '../../model/evolution';
import { NamedAPIResource } from '../../model/utility';
import { LanguagePipe } from '../../pipe/language.pipe';
import { PokemonSpeciesVariety } from '../../model/pokemon';

@Component({
  selector: 'app-evolution-condition',
  templateUrl: './evolution-condition.component.html',
  styleUrls: ['./evolution-condition.component.css'],
  providers: [LanguagePipe],
})
export class EvolutionConditionComponent implements OnInit {
  @Input()
  evolutionNode: ChainLink;
  condition: EvolutionCondition;
  conditions: EvolutionCondition[] = [];

  constructor(
    private apiService: ApiService,
    private itemService: ItemService,
    private moveService: MoveService,
    private typeService: TypeService,
    private pokemonService: PokemonService,
    private languagePipe: LanguagePipe,
  ) { }

  ngOnInit(): void {
    this.getConditions();
  }

  private async getConditions(): Promise<void> {
    let varieties = await this.getVarieties();
    for (let variety of varieties) {
      if (variety.is_default) {
        this.conditions.push(await this.getEvolutionContiditon(this.evolutionNode.evolution_details[0]));
      } else if (this.isVarietyMega(variety)) {
        this.conditions.push({
          iconType: 'special-icon',
          iconName: 'mega-icon',
          iconText: 'Mega',
          addonText: null,
          description: null,
        });
      } else if (this.isVarietyGmax(variety)) {
        this.conditions.push({
          iconType: 'special-icon',
          iconName: 'gmax-icon',
          iconText: 'G-Max',
          addonText: null,
          description: null,
        });
      }
    }
  }

  private isVarietyMega(variety: PokemonSpeciesVariety) : boolean {
    return variety.pokemon.name.indexOf('mega') >= 0;
  }

  private isVarietyGmax(variety: PokemonSpeciesVariety) : boolean {
    return variety.pokemon.name.indexOf('gmax') >= 0;
  }

  private async getVarieties(): Promise<PokemonSpeciesVariety[]> {
    let url = this.evolutionNode.species.url;
    let species = await this.pokemonService.getSpecies(url);
    return species.varieties;
  }

  private async getEvolutionContiditon(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail === undefined) { return null; }
    let result: EvolutionCondition;

    result = this.getHappinessOrAffectionCondition(detail);
    if (result === null) { result = await this.getLearnMoveCondition(detail); }
    if (result === null) { result = await this.getLocationCondition(detail); }
    if (result === null) { result = await this.getHoldItemCondition(detail); }
    if (result === null) { result = await this.getPartyPokemonCondition(detail); }
    if (result === null) { result = await this.getTradeCondition(detail); }
    if (result === null) { result = await this.getUseItemCondition(detail); }
    if (result === null) { result = this.getSpecialCondition(detail); }
    // Make sure getLevelUpCondition is the last condition, because it is the default condition.
    if (result === null) { result = this.getLevelUpCondition(detail); }

    return result;
  }

  private getHappinessOrAffectionCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.min_happiness !== null || detail.min_affection !== null) {
      let result = {
        iconType: "item-icon",
        iconName: "soothe-bell",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: null,
      };

      let baseText: string = this.getDescriptionTriggerText(detail.trigger);
      if (detail.min_happiness !== null) {
        result.description = baseText + " while friendship is " + detail.min_happiness + " or higher";
      } else if (detail.min_affection !== null) {
        result.description = baseText + " while affection is " + detail.min_affection + " or higher";
      }

      return result;
    }

    return null;
  }

  private async getLearnMoveCondition(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail.known_move !== null) {
      let move = await this.moveService.getMove(detail.known_move.url);
      return {
        iconType: "item-icon",
        iconName: "tm-" + move.type.name,
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " knowing " + this.languagePipe.transform(move.names)[0].name,
      };
    }

    return null;
  }

  private async getLocationCondition(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail.location !== null) {
      let location = await this.apiService.get(detail.location.url);
      return {
        iconType: "item-icon",
        iconName: "town-map",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " at " + this.languagePipe.transform(location.names)[0].name,
      };
    }

    return null;
  }

  private async getHoldItemCondition(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail.held_item !== null) {
      let item = await this.itemService.getItem(detail.held_item.url);
      return {
        iconType: "item-icon",
        iconName: detail.held_item.name,
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " holding " + this.languagePipe.transform(item.names)[0].name,
      };
    }

    return null;
  }

  private async getPartyPokemonCondition(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail.party_species !== null || detail.party_type !== null) {
      if (detail.party_species !== null) {
        let species = await this.pokemonService.getSpecies(detail.party_species.url);
        return {
          iconType: "pokemon-icon",
          iconName: detail.party_species.name,
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: this.getDescriptionTriggerText(detail.trigger) + " with " + this.languagePipe.transform(species.names)[0].name + " in party",
        };
      } else if (detail.party_type !== null) {
        let type = await this.typeService.getType(detail.party_type.url);
        return {
          iconType: "item-icon",
          iconName: "rare-candy",
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: this.getDescriptionTriggerText(detail.trigger) + " with " + this.languagePipe.transform(type.names)[0].name + " pokemon in party",
        };
      }
    }

    return null;
  }

  private async getTradeCondition(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail.trigger.name === "trade") {
      if (detail.trade_species !== null) {
        let species = await this.pokemonService.getSpecies(detail.trade_species.url);
        return {
          iconType: "pokemon",
          iconName: detail.trade_species.name,
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: this.getDescriptionTriggerText(detail.trigger) + " with " + this.languagePipe.transform(species.names)[0].name,
        };
      } else {
        return {
          iconType: "item-icon",
          iconName: "pal-pad",
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: null,
        };
      }
    }

    return null;
  }

  private async getUseItemCondition(detail: EvolutionDetail): Promise<EvolutionCondition> {
    if (detail.trigger.name === "use-item") {
      let item = await this.itemService.getItem(detail.item.url);
      return {
        iconType: "item-icon",
        iconName: detail.item.name,
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " " + this.languagePipe.transform(item.names)[0].name,
      };
    }

    return null;
  }

  private getSpecialCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.relative_physical_stats !== null) {
      // #236
      let description: string = null;
      if (detail.relative_physical_stats === 1) {
        description = this.getDescriptionTriggerText(detail.trigger) + " with Attack > Defense";
      } else if (detail.relative_physical_stats === -1) {
        description = this.getDescriptionTriggerText(detail.trigger) + " with Attack < Defense";
      } else if (detail.relative_physical_stats === 0) {
        description = this.getDescriptionTriggerText(detail.trigger) + " with Attack = Defense";
      }

      return {
        iconType: "item-icon",
        iconName: "rare-candy",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: description,
      };
    } else if (detail.trigger.name === "shed") {
      // #290
      return {
        iconType: "item-icon",
        iconName: "poke-ball",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: "Place in the team and a Poké Ball",
      };
    } else if (detail.min_beauty !== null) {
      // #349
      return {
        iconType: "item-icon",
        iconName: "blue-scarf",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " while beauty is " + detail.min_beauty + " or higher",
      };
    } else if (detail.turn_upside_down) {
      // #686
      return {
        iconType: "item-icon",
        iconName: "rare-candy",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " holding game system upside down",
      };
    } else if (detail.needs_overworld_rain) {
      // #705
      return {
        iconType: "item-icon",
        iconName: "rare-candy",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: this.getDescriptionTriggerText(detail.trigger) + " while raining or foggy",
      };
    }

    return null;
  }

  private getLevelUpCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.trigger.name === "level-up") {
      return {
        iconType: "item-icon",
        iconName: "rare-candy",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: null,
      }
    }

    return null;
  }

  private getDescriptionTriggerText(trigger: NamedAPIResource): string {
    if (trigger.name === "level-up") {
      return "Level up";
    } else if (trigger.name === "trade") {
      return "Trade";
    } else if (trigger.name === "use-item") {
      return "Use";
    }

    return null;
  }

  private getIconText(detail: EvolutionDetail): string {
    if (detail.trigger.name === "level-up") {
      if (detail.min_level !== null) {
        return "Lv." + detail.min_level;
      } else {
        return "Lv. up";
      }
    } else if (detail.trigger.name === "trade") {
      return "Trade";
    } else if (detail.trigger.name === "use-item") {
      return "Item";
    }

    return null;
  }

  private getAddonText(detail: EvolutionDetail): string {
    if (detail.time_of_day !== "") {
      // time of day
      return detail.time_of_day;
    } else if (detail.gender !== null) {
      // gender
      if (detail.gender === 1) {
        return "female";
      } else if (detail.gender === 2) {
        return "male";
      }
    } else if (detail.known_move_type !== null) {
      return detail.known_move_type.name + " moves";
    }

    return null;
  }
}
