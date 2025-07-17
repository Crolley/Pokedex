// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import {
  fetchPokemonById,
  fetchPokemonByName,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "../Service/Api/PokeApi";
import { mapToPokemon } from "@/Service/PokeMapping";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../types/Pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Pour l'instant on charge les 12 premiers
  const loadInitial = async () => {
    try {
      const entries = await Promise.all(
        Array.from({ length: 128 }, (_, i) => i + 1).map(async (id) => {
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

  if (loading) return <p className="p-4">Chargement des Pokémon…</p>;
  if (error) return <p className="p-4 text-red-500">Erreur : {error}</p>;

  return (
    <div className="min-h-screen bg-[#f6f8fc] py-6">
      <div className="mx-auto px-6 sm:px-6 lg:px-8 2xl:px-16">
        <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6">
          {pokemons.map((p) => (
            <div className="w-full" key={p.id}>
              <PokemonCard pokemon={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
