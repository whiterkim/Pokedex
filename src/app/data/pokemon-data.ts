import { Pokemon } from '../model/pokemon';

export const PokemonData: Pokemon[] = [
    {
        id: 1, pokeDexId: 1, formId: 1, formType: null, name: 'Bulbasaur', 
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '1SpA',
        typeOne: 11, typeTwo: 3,
        baseSatas: {
            hp: 45, atk: 49, def: 49, spAtk: 65, spDef: 65, speed: 45
        },
        abilityOne: 65, abilityTwo: 0, abilityHidden: 34,
        pokeDexEntry: 'A strange seed was planted on its back at birth. The plant sprous and grows with this Pokemon.',
        evolution: [
            { order: 1, pokemonId: 1, pokemonName: 'Bulbasaur', condition: 'Lv 16' },
            { order: 2, pokemonId: 2, pokemonName: 'Ivysaur', condition: 'Lv 32' },
            { order: 3, pokemonId: 3, pokemonName: 'Venusaur', condition: 'Mega Evolution' },
            { order: 4, pokemonId: 3.2, pokemonName: 'Mega Venusaur', condition: null }
        ]
    },
    {
        id: 2, pokeDexId: 2, formId: 1, formType: null, name: 'Ivysaur', 
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '1SpA+1SpD',
        typeOne: 11, typeTwo: 3,
        baseSatas: {
            hp: 60, atk: 62, def: 63, spAtk: 80, spDef: 80, speed: 60
        },
        abilityOne: 65, abilityTwo: 0, abilityHidden: 34,
        pokeDexEntry: 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
        evolution: [
            { order: 1, pokemonId: 1, pokemonName: 'Bulbasaur', condition: 'Lv 16' },
            { order: 2, pokemonId: 2, pokemonName: 'Ivysaur', condition: 'Lv 32' },
            { order: 3, pokemonId: 3, pokemonName: 'Venusaur', condition: 'Mega Evolution' },
            { order: 4, pokemonId: 3.2, pokemonName: 'Mega Venusaur', condition: null }
        ]
    },
    {
        id: 3, pokeDexId: 3, formId: 1, formType: null, name: 'Venusaur', 
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '2 SpA+1 SpD',
        typeOne: 11, typeTwo: 3,
        baseSatas: {
            hp: 80, atk: 82, def: 83, spAtk: 100, spDef: 100, speed: 80
        },
        abilityOne: 65, abilityTwo: 0, abilityHidden: 34,
        pokeDexEntry: 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
        evolution: [
            { order: 1, pokemonId: 1, pokemonName: 'Bulbasaur', condition: 'Lv 16' },
            { order: 2, pokemonId: 2, pokemonName: 'Ivysaur', condition: 'Lv 32' },
            { order: 3, pokemonId: 3, pokemonName: 'Venusaur', condition: 'Mega Evolution' },
            { order: 4, pokemonId: 3.2, pokemonName: 'Mega Venusaur', condition: null }
        ]
    },
    {
        id: 3.2, pokeDexId: 3, formId: 2, formType: 'mega', name: 'Mega Venusaur',
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '2 SpA+1 SpD',
        typeOne: 11, typeTwo: 3,
        baseSatas: {
            hp: 80, atk: 100, def: 123, spAtk: 122, spDef: 120, speed: 80
        },
        abilityOne: 47, abilityTwo: 0, abilityHidden: 0,
        pokeDexEntry: 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
        evolution: [
            { order: 1, pokemonId: 1, pokemonName: 'Bulbasaur', condition: 'Lv 16' },
            { order: 2, pokemonId: 2, pokemonName: 'Ivysaur', condition: 'Lv 32' },
            { order: 3, pokemonId: 3, pokemonName: 'Venusaur', condition: 'Mega Evolution' },
            { order: 4, pokemonId: 3.2, pokemonName: 'Mega Venusaur', condition: null }
        ]
    }
];