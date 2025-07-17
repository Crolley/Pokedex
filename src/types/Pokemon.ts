import { Ability } from "./Ability";
import { Evolution } from "./Evolution";
import { Stat } from "./Stat";
import { PokemonType } from "./Type";

export type Pokemon = {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
  description: string;
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Stat[];
  evolution: Evolution[];
};
