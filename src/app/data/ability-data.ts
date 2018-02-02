import { Abality } from '../model/abality';

export const AbalityData: Abality[] = [
    {
        id: 0, name: '(No abality)',
        description: '-',
        pokemon: []
    },
    {
        id: 34, name: 'Chlorophyll',
        description: 'Double Speed during Strong Sunlight.',
        pokemon: [1, 2, 3]
    },
    {
        id: 47, name: 'Thick Fat',
        description: 'Halves damage from Fire and Ice moves.',
        pokemon: [3]
    },
    {
        id: 65, name: 'Overgrow',
        description: 'Strengthens Grass moves to inflict 1.5* damage at 1/3 max HP or less.',
        pokemon: [1, 2, 3]
    }
];
