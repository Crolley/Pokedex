// src/Hook/usePokemon.ts
import { useState, useEffect } from "react";
import {
  fetchAllPokemonSpecies,
  fetchCompletePokemon,
} from "../Service/Api/PokeApi";
import { mapToPokemon } from "../Service/PokeMapping";
import type { Pokemon } from "../types/Pokemon";

export function usePokemon(batchSize = 20) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        // 1) Récupère la liste des species (uniquement les vraies espèces)
        const speciesList = await fetchAllPokemonSpecies();
        const total = speciesList.length;
        const allResults: Pokemon[] = [];

        // 2) On traite par paquets de `batchSize`
        for (let i = 0; i < total; i += batchSize) {
          const chunk = speciesList.slice(i, i + batchSize);

          // 3) Pour chaque chunk, on fait un Promise.all
          const batchResults = await Promise.all(
            chunk.map(async ({ url }) => {
              const parts = url.split("/").filter(Boolean);
              const id = Number(parts[parts.length - 1]);
              const { pokemon, species, evolutionChain } =
                await fetchCompletePokemon(id);
              return mapToPokemon(pokemon, species, evolutionChain);
            })
          );

          // 4) On concatène les résultats et on met à jour l'état
          allResults.push(...batchResults);
          setPokemons([...allResults]);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [batchSize]);

  return { pokemons, loading, error };
}
