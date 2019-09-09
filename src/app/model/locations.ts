import { NamedAPIResource, Name, GenerationGameIndex, VersionEncounterDetail } from "./utility";

export interface Location {
    id: number;
    name: string;
    region: NamedAPIResource;
    names: Name[];
    game_indices: GenerationGameIndex[];
    areas: NamedAPIResource[];
}

export interface LocationArea {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: EncounterMethodRate[];
    location: NamedAPIResource;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
    encounter_method: NamedAPIResource;
    version_details: EncounterVersionDetails[];
}

export interface EncounterVersionDetails {
    rate: number;
    version: NamedAPIResource;
}

export interface PokemonEncounter {
    pokemon: NamedAPIResource;
    version_details: VersionEncounterDetail[];
}

export interface PalParkArea {
    id: number;
    name: string;
    names: Name[];
    pokemon_encounters: PalParkEncounterSpecies[];
}

export interface PalParkEncounterSpecies {
    base_score: number;
    rate: number;
    pokemon_species: NamedAPIResource;
}

export interface Region {
    id: number;
    locations: NamedAPIResource[];
    name: string;
    names: Name[];
    main_generation: NamedAPIResource;
    pokedexes: NamedAPIResource[];
    version_groups: NamedAPIResource[];
}

