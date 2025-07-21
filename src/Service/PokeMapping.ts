import { Pokemon } from "../types/Pokemon";
import { PokemonType } from "../types/Type";
import { Evolution } from "../types/Evolution";
import { PokemonStat, Stat } from "../types/Stat";

import capitalize from "@/utils/Capitalize";

function mapToPokemon(
  pokemon: any,
  species: any,
  evolutionChain: any,
): Pokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front_default,
    types: pokemon.types.map((t: any) => t.type.name as PokemonType),
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    description: extractDescription(species),
    abilities: pokemon.abilities.map((a: any) => ({
      name: capitalize(a.ability.name),
    })),
    stats: pokemon.stats.map(
      (s: any): Stat => ({
        name: statKeyMap[s.stat.name],
        value: s.base_stat,
      }),
    ),
    evolution: mapEvolutionChain(evolutionChain),
  };
}

const statKeyMap: Record<string, PokemonStat> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "Spe",
};

function extractDescription(species: any): string {
  const entry = species.flavor_text_entries.find(
    (e: any) => e.language.name === "fr",
  );

  return entry?.flavor_text.replace(/\f/g, " ") ?? "No description available.";
}

// Mappe la chaîne d'évolution en un tableau d'Evolution
function mapEvolutionChain(evolution: any): Evolution[] {
  const evolutions: Evolution[] = [];
  let current = evolution.chain;

  while (current && current.evolves_to.length > 0) {
    const next = current.evolves_to[0];

    evolutions.push({
      id: extractIdFromUrl(current.species.url),
      name: capitalize(current.species.name),
      level: next.evolution_details[0]?.min_level ?? null,
      sprite: getSpriteUrl(current.species.url),
      types: [],
    });

    current = next;
  }

  // dernière étape (forme finale)
  if (current) {
    evolutions.push({
      id: extractIdFromUrl(current.species.url),
      name: capitalize(current.species.name),
      level: null,
      sprite: getSpriteUrl(current.species.url),
      types: [],
    });
  }

  return evolutions;
}

// Extrait l'ID d'une URL de Pokémon
function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);

  return parseInt(parts[parts.length - 1], 10);
}

// Génère l'URL du sprite d'un Pokémon
function getSpriteUrl(id: number | string, animated = false): string {
  const extractedId = typeof id === "string" ? extractIdFromUrl(id) : id;

  if (animated && Number(extractedId) <= 649) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${extractedId}.gif`;
  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractedId}.png`;
}

export { mapToPokemon, getSpriteUrl, extractDescription, mapEvolutionChain };
