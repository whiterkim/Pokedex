import { Pokemon } from '../model/pokemon';

export const PokemonData: Pokemon[] = [
    {
        id: 1, name: 'Bulbasaur', 
        typeOneId: 11, typeOneName: 'Grass', typeTwoId: 3, typeTwoName: 'Poison',
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '1SpA',

        abalityOne: 65, abalityTwo: 0, abalityHidden: 34
    },
    {
        id: 2, name: 'Ivysaur', 
        typeOneId: 11, typeOneName: 'Grass', typeTwoId: 3, typeTwoName: 'Poison',
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '1SpA+1SpD',

        abalityOne: 65, abalityTwo: 0, abalityHidden: 34
    },
    {
        id: 3, name: 'Venusaur', 
        typeOneId: 11, typeOneName: 'Grass', typeTwoId: 3, typeTwoName: 'Poison',
        category: 'Seed Pokemon', generation: 1,
        eggGroupOne: 'Monster', eggGroupTwo: 'Grass',
        captureRate: 45, genderRate: '87.5%M / 12.5%F',
        evYield: '2 SpA+1 SpD',

        abalityOne: 65, abalityTwo: 0, abalityHidden: 34
    }
];