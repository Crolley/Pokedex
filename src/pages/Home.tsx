// src/pages/Home.tsx
import { useEffect, useState } from "react";

import {
  fetchPokemonById,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "../Service/Api/PokeApi";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../types/Pokemon";

import { mapToPokemon } from "@/Service/PokeMapping";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showLoader, setShowLoader] = useState(true);
  const [query, setQuery] = useState("");

  // Pour l'instant on charge les 12 premiers
  const loadInitial = async () => {
    try {
      const entries = await Promise.all(
        Array.from({ length: 600 }, (_, i) => i + 1).map(async (id) => {
          // on récupère chaque bloc brut de données
          const pokemon = await fetchPokemonById(id);
          const species = await fetchPokemonSpecies(id);
          const evolutionChain = await fetchEvolutionChain(
            species.evolution_chain.url
          );

          // mappe vers notre type clean
          return mapToPokemon(pokemon, species, evolutionChain);
        })
      );

      setPokemons(entries);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {showLoader && (
        <Loader loading={loading} onExited={() => setShowLoader(false)} />
      )}

      {!loading && error && (
        <p className="p-4 text-red-500">Erreur : {error}</p>
      )}

      {!loading && !error && (
        <div className="min-h-screen bg-[#f6f8fc] py-6">
          <div className="mx-auto max-w-screen-xl px-6 sm:px-6 lg:px-8 2xl:px-16 ">
            <SearchBar
              value={query}
              placeholder="Rechercher un Pokémon…"
              onChange={setQuery}
            />
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                Aucun Pokémon trouvé.
              </p>
            )}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 ">
              {filtered.map((p) => (
                <div key={p.id} className="w-full">
                  <PokemonCard pokemon={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
