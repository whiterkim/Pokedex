import { NamedAPIResource, APIResource, VerboseEffect, MachineVersionDetail, Name, Description } from "./utility";
import { AbilityEffectChange } from "./pokemon";

export interface Move {
    id: number;
    name: string;
    accuracy: number;
    effect_chance: number;
    pp: number;
    priority: number;
    power: number;
    contest_combos: ContestComboSets;
    contest_type: NamedAPIResource;
    contest_effect: APIResource;
    damage_class: NamedAPIResource;
    effect_entries: VerboseEffect[];
    effect_changes: AbilityEffectChange[];
    flavor_text_entries: MoveFlavorText[];
    generation: NamedAPIResource;
    machines: MachineVersionDetail[];
    meta: MoveMetaData;
    names: Name[];
    past_values: PastMoveStatValues[];
    stat_changes: MoveStatChange[];
    super_contest_effect: APIResource;
    target: NamedAPIResource;
    type: NamedAPIResource;
}

export interface ContestComboSets {
    normal: ContestComboDetail;
    super: ContestComboDetail;
}

export interface ContestComboDetail {
    use_before: NamedAPIResource[];
    use_after: NamedAPIResource[];
}

export interface MoveFlavorText {
    flavor_text: string;
    language: NamedAPIResource[];
    version_group: NamedAPIResource[];
}

export interface MoveMetaData {
    ailment: NamedAPIResource;
    category: NamedAPIResource;
    min_hits: number;
    max_hits: number;
    min_turns: number;
    max_turns: number;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
}

export interface MoveStatChange {
    change: number;
    stat: NamedAPIResource;
}

export interface PastMoveStatValues {
    accuracy: number;
    effect_chance: number;
    power: number;
    pp: number;
    effect_entries: VerboseEffect[];
    type: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface MoveAilment {
    id: number;
    name: string;
    moves: NamedAPIResource[];
    names: Name[];
}

export interface MoveBattleStyle {
    id: number;
    name: string;
    names: Name[];
}

export interface ModelName {
    id: number;
    name: string;
    moves: NamedAPIResource[];
    descriptions: Description[];
}

export interface MoveDamageClass {
    id: number;
    name: string;
    descriptions: Description[];
    moves: NamedAPIResource[];
    names: Name[];
}

export interface MoveLearnMethod {
    id: number;
    name: string;
    descriptions: Description[];
    names: Name[];
    version_groups: NamedAPIResource[];
}

export interface MoveTarget {
    id: number;
    name: string;
    descriptions: Description[];
    moves: NamedAPIResource[];
    names: Name[];
}

