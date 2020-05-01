import { Component, OnInit, Input } from '@angular/core';

import { PokemonService } from '../../service/pokemon.service';
import { EvolutionChain, ChainLink, EvolutionDetail } from '../../model/evolution';

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
  evolutionLists: ChainLink[][] = [];

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.getEvolutionChain();
  }

  getEvolutionContiditon(detail: EvolutionDetail): EvolutionCondition {
    let result: EvolutionCondition = new EvolutionCondition();

    result.baseCondition = this.getBaseCondition(detail);
    
    let handled = false;
    if (!handled) { handled = this.checkHappinessOrAffectionCondition(detail, result); }
    if (!handled) { handled = this.checkLearnMoveCondition(detail, result); }
    if (!handled) { handled = this.checkLocationCondition(detail, result); }
    if (!handled) { handled = this.checkHoldItemCondition(detail, result); }
    if (!handled) { handled = this.checkPartyPokemonCondition(detail, result); }
    if (!handled) { handled = this.checkTradeCondition(detail, result); }
    if (!handled) { handled = this.checkUseItemCondition(detail, result); }
    if (!handled) { handled = this.checkSpecialCondition(detail, result); }
    if (!handled) { this.checkLevelUpCondition(detail, result); }

    result.appendCondition = this.getAppendCondition(detail);

    return result;
  }

  private dfs(node: ChainLink, currentChain: ChainLink[]): void {
    if (node.evolves_to.length === 0) {
      this.evolutionLists.push(Object.assign([], currentChain));
      return;
    }

    for (let i = 0; i < node.evolves_to.length; i++) {
      currentChain.push(node.evolves_to[i]);
      this.dfs(node.evolves_to[i], currentChain);
      currentChain.pop();
    }
  }

  private async getEvolutionChain(): Promise<void> {
    this.evolutionChain = await this.pokemonService.getEvolutionChain(this.url);

    this.dfs(this.evolutionChain.chain, [this.evolutionChain.chain]);
  }

  private checkHappinessOrAffectionCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.min_happiness !== null || detail.min_affection !== null) {
      result.iconType = "item-icon";
      result.iconName = "soothe-bell";
      result.isExtraExplanation = true;

      if (detail.min_happiness !== null) {
        result.addCondition = "Friendship " + detail.min_happiness;
      } else if (detail.min_affection !== null) {
        result.addCondition = "Affection " + detail.min_affection;
      }

      return true;
    }

    return false;
  }

  private checkLearnMoveCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.known_move !== null) {
      result.iconType = "item-icon";
      result.iconName = "tm-normal"; // TODO: change to dynamic
      result.isExtraExplanation = true;
      result.addCondition = "Learn " + detail.known_move.name;
      return true;
    }

    return false;
  }

  private checkLocationCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.location !== null) {
      result.iconType = "item-icon";
      result.iconName = "town-map";
      result.isExtraExplanation = true;
      result.addCondition = detail.location.name;
      return true;
    }

    return false;
  }

  private checkHoldItemCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.held_item !== null) {
      result.iconType = "item-icon";
      result.iconName = detail.held_item.name;
      result.isExtraExplanation = false;
      result.addCondition = "Holding " + detail.held_item.name;
      return true;
    }

    return false;
  }

  private checkPartyPokemonCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.party_species !== null || detail.party_type !== null) {
      result.isExtraExplanation = true;
      if (detail.party_species !== null) {
        result.iconType = "pokemon-icon";
        result.iconName = detail.party_species.name;
        result.addCondition = "Have " + detail.party_species.name;
      } else if (detail.party_type !== null) {
        result.iconType = "item-icon";
        result.iconName = "rare-candy";
        result.addCondition = "Have " + detail.party_type.name + " pokemon";
      }

      return true;
    }

    return false;
  }
  
  private checkTradeCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.trigger.name === "trade") {
      if (detail.trade_species !== null) {
        result.iconType = "pokemon";
        result.iconName = detail.trade_species.name;
        result.isExtraExplanation = true;
        result.addCondition = detail.trade_species.name;
        return true;
      } else {
        result.iconType = "item-icon";
        result.iconName = "pal-pad";
        result.isExtraExplanation = false;
      }
    }

    return false;
  }

  private checkUseItemCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.trigger.name === "use-item") {
      result.iconType = "item-icon";
      result.iconName = detail.item.name;
      result.addCondition = "Use " + detail.item.name;
      return true;
    }

    return false;
  }

  private checkSpecialCondition(detail: EvolutionDetail, result: EvolutionCondition): boolean {
    if (detail.relative_physical_stats !== null) {
      // #236
      result.iconType = "item-icon";
      result.iconName = "rare-candy";
      result.isExtraExplanation = true;
      if (detail.relative_physical_stats === 1) {
        result.addCondition = "Attack > Defense";
      } else if (detail.relative_physical_stats === -1) {
        result.addCondition = "Attack < Defense";
      } else if (detail.relative_physical_stats === 0) {
        result.addCondition = "Attack = Defense";
      }

      return true;
    } else if (detail.trigger.name === "shed") {
      // #290
      result.iconType = "item-icon";
      result.iconName = "poke-ball";
      result.isExtraExplanation = true;
      result.addCondition = "Place in the team and a Poké Ball"
    } else if (detail.min_beauty !== null) {
      // #349
      result.iconType = "item-icon";
      result.iconName = "blue-scarf";
      result.isExtraExplanation = true;
      result.addCondition = "Beauty " + detail.min_beauty;
      return true;
    } else if (detail.turn_upside_down) {
      // #686
      result.iconType = "item-icon";
      result.iconName = "rare-candy";
      result.isExtraExplanation = true;
      result.addCondition = "Turn upside down";
      return true;
    } else if (detail.needs_overworld_rain) {
      // #705
      result.iconType = "item-icon";
      result.iconName = "rare-candy";
      result.isExtraExplanation = true;
      result.addCondition = "Raining";
      return true;
    }

    return false;
  }

  private checkLevelUpCondition(detail: EvolutionDetail, result: EvolutionCondition) {
    if (detail.trigger.name === "level-up") {
      result.iconType = "item-icon";
      result.iconName = "rare-candy";
      result.isExtraExplanation = false;
    }
  }

  private getBaseCondition(detail: EvolutionDetail): string {
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

  private getAppendCondition(detail: EvolutionDetail): string {
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

class EvolutionCondition {
  iconType: string = null;
  iconName: string = null;
  baseCondition: string = null;
  addCondition: string = null;
  appendCondition: string = null;
  isExtraExplanation: boolean = false;
}