import { PokemonType } from "./Type";

export type Evolution = {
    id: number;
    name: string;
    level: number | null;
    sprite: string;
    types: PokemonType[];
}
