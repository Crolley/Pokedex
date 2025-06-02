export type PokemonStat =
  | "HP"
  | "Atk"
  | "SpA"
  | "Def"
  | "SpD"
  | "Spe"

export type Stat = {
  name: PokemonStat;
  value: number;
};