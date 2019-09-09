import { NamedAPIResource } from "./utility";

export interface Machine {
    id: number;
    item: NamedAPIResource;
    move: NamedAPIResource;
    version_group: NamedAPIResource;
}

