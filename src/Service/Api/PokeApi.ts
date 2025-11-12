// src/api/pokeApi.ts
const API_BASE = "https://pokeapi.co/api/v2";

// Fetch tous les Pokémon
export async function fetchAllPokemon(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/pokemon?limit=1025`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des Pokémon");
  const data = await res.json();
  return data.results;
}

// Fetch un Pokémon par son ID
export async function fetchPokemonById(id: number): Promise<any> {
  const res = await fetch(`${API_BASE}/pokemon/${id}`);
  if (!res.ok)
    throw new Error(`Erreur lors de la récupération du Pokémon ${id}`);
  return res.json();
}

// Fetch un Pokémon par son nom
export async function fetchPokemonByName(name: string): Promise<any> {
  const res = await fetch(`${API_BASE}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error(`Pokémon "${name}" introuvable`);
  return res.json();
}

// Fetch les informations de la species d'un Pokémon
export async function fetchPokemonSpecies(id: number): Promise<any> {
  const res = await fetch(`${API_BASE}/pokemon-species/${id}`);
  if (!res.ok)
    throw new Error(`Erreur lors de la récupération de la species ${id}`);
  return res.json();
}

// Fetch la chaîne d'évolution d'un Pokémon
export async function fetchEvolutionChain(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Erreur lors de la récupération de la chaîne d’évolution`);
  return res.json();
}

export async function fetchCompletePokemon(id: number) {
  const pokemon = await fetchPokemonById(id);
  const species = await fetchPokemonSpecies(id);
  const evolutionChain = await fetchEvolutionChain(species.evolution_chain.url);

  return { pokemon, species, evolutionChain };
}
