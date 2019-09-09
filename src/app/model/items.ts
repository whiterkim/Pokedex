import { NamedAPIResource, VerboseEffect, VersionGroupFlavorText, GenerationGameIndex, Name, APIResource, MachineVersionDetail, Description, Effect } from "./utility";

export interface Item {
    id: number;
    name: string;
    cost: number;
    fling_power: number;
    fling_effect: NamedAPIResource;
    attributes: NamedAPIResource[];
    category: ItemCategory;
    effect_entries: VerboseEffect[];
    flavor_text_entries: VersionGroupFlavorText[];
    game_indices: GenerationGameIndex[];
    names: Name[];
    sprites: ItemSprites;
    held_by_pokemon: ItemHolderPokemon[];
    baby_trigger_for: APIResource;
    machines: MachineVersionDetail[];
}

export interface ItemSprites {
    default: string;
}

export interface ItemHolderPokemon {
    pokemon: string;
    version_details: ItemHolderPokemonVersionDetail[];
}

export interface ItemHolderPokemonVersionDetail {
    rarity: string;
    version: NamedAPIResource;
}

export interface ItemAttribute {
    id: number;
    name: string;
    items: NamedAPIResource[];
    names: Name[];
    descriptions: Description[];
}

export interface ItemCategory {
    id: number;
    name: string;
    items: NamedAPIResource[];
    names: Name[];
    pocket: NamedAPIResource;
}

export interface ItemFlingEffect {
    id: number;
    name: string;
    effect_entries: Effect[];
    items: NamedAPIResource;
}

export interface ItemPocket {
    id: number;
    name: string;
    categories: NamedAPIResource[];
    names: Name[];
}

