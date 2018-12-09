import { Move } from '../model/move';

export const MoveData: Move[] = [
    {
        id: 0, name: '(No move)',
        type: 18,
        accuracy: -1,
        pokemon: []
    },
    {
        id: 22, name: "Vine Whip",
        type: 11,
        accuracy: 100,
        pokemon: [1, 2, 3]
    },
    {
        id: 33, name: "Tackle",
        type: 0,
        accuracy: 100,
        pokemon: [1, 2, 3]
    },
    {
        id: 45, name: "Growl",
        type: 0,
        accuracy: 100,
        pokemon: [1, 2, 3]
    },
    {
        id: 73, name: "Leech Seed",
        type: 11,
        accuracy: 90,
        pokemon: [1, 2, 3]
    },
    {
        id: 104, name: "Double Team",
        type: 0,
        accuracy: 101,
        pokemon: [1, 2, 3]
    },
    {
        id: 412, name: "Energy Ball",
        type: 11,
        accuracy: 100,
        pokemon: [1, 2, 3]
    },
];
