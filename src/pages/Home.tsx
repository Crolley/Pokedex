// src/pages/Home.tsx
import { useState } from "react";
import { usePokemon } from "../Hook/usePokemon";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import type { Pokemon } from "../types/Pokemon";

export default function Home() {
  const { pokemons, loading, error } = usePokemon();
  const [showLoader, setShowLoader] = useState(true);
  const [query, setQuery] = useState("");

  const filtered = pokemons.filter((p: Pokemon) =>
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
          <div className="mx-auto max-w-screen-xl px-6 sm:px-6 lg:px-8 2xl:px-16">
            <SearchBar
              value={query}
              onChange={setQuery}
            />

            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                Aucun Pokémon trouvé.
              </p>
            ) : (
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6">
                {filtered.map((p: Pokemon) => (
                  <div key={p.id} className="w-full">
                    <PokemonCard pokemon={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
