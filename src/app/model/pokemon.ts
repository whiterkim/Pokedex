export class Pokemon {
    id: number;
    pokeDexId: number;
    formId: number;
    formType: string;
    name: string;
    category: string;
    generation: number;
    eggGroupOne: string;
    eggGroupTwo: string;
    captureRate: number;
    genderRate: string;
    evYield: string;
    typeOne: number;
    typeTwo: number;
    baseSatas: BaseStats;
    abilityOne: number;
    abilityTwo: number;
    abilityHidden: number;
    levelMoves: number[];
    tmhmMoves: number[];
    eggMoves: number[];
    tutorMoves: number[];
    pokeDexEntry: string;
    evolution: Evolution[];
}

export class BaseStats {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
}

export class Evolution {
    order: number;
    pokemonId: number;
    pokemonName: string;
    condition: string;
}

export class PokemonBasis {
    constructor() {}
    id: number;
    key: string;
    name: string;
    types: any;
}

export class PokemonDetail extends PokemonBasis {
    constructor() { super(); }

    abilities: any;
    base_experience: number;
    capture_rate: number;
    egg_groups: any;
    evolution_list: any;
    flavor_text: string;
    // forms: any;
    // gmae_indices: any;
    gender_rate: number;
    generation: string;
    genus: string;
    // height: number;
    // held_items: any;
    // is_default: boolean;
    // location_area_encounters: any;
    egg_moves: any;
    level_moves: any;
    machine_moves: any;
    tutor_moves: any;
    order: number;
    // species: any;
    // sprites: any;
    stats: Stats;
}

export class Stats {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}