import { Component, OnInit, Input } from '@angular/core';

import { PokemonService } from '../../service/pokemon.service';
import { EvolutionChain, ChainLink, EvolutionDetail, EvolutionCondition, EvolutionNode } from '../../model/evolution';

@Component({
  selector: 'app-evolution-chain',
  inputs: ['url'],
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})
export class EvolutionChainComponent implements OnInit {
  @Input()
  url: string;
  evolutionChain: EvolutionChain;
  evolutionLists: EvolutionNode[][] = [];

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.getEvolutionChain();
  }

  getEvolutionContiditon(detail: EvolutionDetail): EvolutionCondition {
    if (detail === undefined) { return null; }
    let result: EvolutionCondition;


    result = this.getHappinessOrAffectionCondition(detail);
    if (result === null) { result = this.getLearnMoveCondition(detail); }
    if (result === null) { result = this.getLocationCondition(detail); }
    if (result === null) { result = this.getHoldItemCondition(detail); }
    if (result === null) { result = this.getPartyPokemonCondition(detail); }
    if (result === null) { result = this.getTradeCondition(detail); }
    if (result === null) { result = this.getUseItemCondition(detail); }
    if (result === null) { result = this.getSpecialCondition(detail); }
    // Make sure getLevelUpCondition is the last condition, because it is the default condition.
    if (result === null) { result = this.getLevelUpCondition(detail); }

    return result;
  }

  private dfs(node: ChainLink, currentChain: EvolutionNode[]): void {
    if (node.evolves_to.length === 0) {
      this.evolutionLists.push(Object.assign([], currentChain));
      return;
    }

    for (let i = 0; i < node.evolves_to.length; i++) {
      currentChain.push({
        is_baby: node.evolves_to[i].is_baby,
        species: node.evolves_to[i].species,
        condition: this.getEvolutionContiditon(node.evolves_to[i].evolution_details[0])
      });

      this.dfs(node.evolves_to[i], currentChain);
      currentChain.pop();
    }
  }

  private async getEvolutionChain(): Promise<void> {
    this.evolutionChain = await this.pokemonService.getEvolutionChain(this.url);

    this.dfs(this.evolutionChain.chain, [{
      is_baby: this.evolutionChain.chain.is_baby,
      species: this.evolutionChain.chain.species,
      condition: this.getEvolutionContiditon(this.evolutionChain.chain.evolution_details[0])
    }]);
  }

  private getHappinessOrAffectionCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.min_happiness !== null || detail.min_affection !== null) {
      let description: string = null;
      if (detail.min_happiness !== null) {
        description = "Friendship " + detail.min_happiness;
      } else if (detail.min_affection !== null) {
        description = "Affection " + detail.min_affection;
      }

      return {
        iconType: "item-icon",
        iconName: "soothe-bell",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: description,
      };
    }

    return null;
  }

  private getLearnMoveCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.known_move !== null) {
      return {
        iconType: "item-icon",
        iconName: "tm-normal", // TODO: change to dynamic
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: "Learn " + detail.known_move.name,
      };
    }

    return null;
  }

  private getLocationCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.location !== null) {
      return {
        iconType: "item-icon",
        iconName: "town-map",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: detail.location.name,
      };
    }

    return null;
  }

  private getHoldItemCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.held_item !== null) {
      return {
        iconType: "item-icon",
        iconName: detail.held_item.name,
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: "Holding " + detail.held_item.name,
      };
    }

    return null;
  }

  private getPartyPokemonCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.party_species !== null || detail.party_type !== null) {
      if (detail.party_species !== null) {
        return {
          iconType: "pokemon-icon",
          iconName: detail.party_species.name,
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: "Have " + detail.party_species.name,
        };
      } else if (detail.party_type !== null) {
        return {
          iconType: "item-icon",
          iconName: "rare-candy",
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: "Have " + detail.party_type.name + " pokemon",
        };
      }
    }

    return null;
  }

  private getTradeCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.trigger.name === "trade") {
      if (detail.trade_species !== null) {
        return {
          iconType: "pokemon",
          iconName: detail.trade_species.name,
          iconText: this.getIconText(detail),
          addonText: this.getAddonText(detail),
          description: detail.trade_species.name,
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

  private getUseItemCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.trigger.name === "use-item") {
      return {
        iconType: "item-icon",
        iconName: detail.item.name,
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: "Use " + detail.item.name,
      };
    }

    return null;
  }

  private getSpecialCondition(detail: EvolutionDetail): EvolutionCondition {
    if (detail.relative_physical_stats !== null) {
      // #236
      let description: string = null;
      if (detail.relative_physical_stats === 1) {
        description = "Attack > Defense";
      } else if (detail.relative_physical_stats === -1) {
        description = "Attack < Defense";
      } else if (detail.relative_physical_stats === 0) {
        description = "Attack = Defense";
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
        description: "Beauty " + detail.min_beauty,
      };
    } else if (detail.turn_upside_down) {
      // #686
      return {
        iconType: "item-icon",
        iconName: "rare-candy",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: "Turn upside down",
      };
    } else if (detail.needs_overworld_rain) {
      // #705
      return {
        iconType: "item-icon",
        iconName: "rare-candy",
        iconText: this.getIconText(detail),
        addonText: this.getAddonText(detail),
        description: "Raining",
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
      return "Use";
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
