export interface APIResourceList {
    count: number;
    next: string;
    previous: boolean;
    results: APIResource[];
}

export interface NamedAPIResourceList {
    count: number;
    next: string;
    previous: boolean;
    results: NamedAPIResource[];
}

export interface Language {
    id: number;
    name: string;
    official: boolean;
    iso639: string;
    iso3166: string;
    names: Name[];
}

export interface APIResource {
    url: string;
}

export interface Description {
    description: string;
    language: NamedAPIResource;
}

export interface Effect {
    effect: string;
    language: NamedAPIResource;
}

export interface Encounter {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}

export interface FlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
}

export interface GenerationGameIndex {
    game_index: number;
    generation: NamedAPIResource;
}

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}

export interface Name {
    name: string;
    language: NamedAPIResource;
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface VerboseEffect {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
}

export interface VersionEncounterDetail {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter[];
}

export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource;
}

export interface VersionGroupFlavorText {
    text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}
