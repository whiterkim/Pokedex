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