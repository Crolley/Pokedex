// src/components/PokemonCard.tsx
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/react";
import { Pokemon } from "@/types/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColorMap: Record<string, string> = {
  normal: "bg-normal",
  fire: "bg-fire",
  water: "bg-water",
  grass: "bg-grass",
  electric: "bg-electric",
  ice: "bg-ice",
  fighting: "bg-fighting",
  poison: "bg-poison",
  ground: "bg-ground",
  flying: "bg-flying",
  psychic: "bg-psychic",
  bug: "bg-bug",
  rock: "bg-rock",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  dark: "bg-dark",
  steel: "bg-steel",
  fairy: "bg-fairy",
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => (
  <Card
    className={`
      relative
      w-full
      bg-white rounded-3xl shadow-md
      overflow-visible text-center
    `}
  >
    <CardHeader className="absolute left-1/2 -translate-x-1/2 -mt-14 flex justify-center">
      <Image src={pokemon.sprite} alt={pokemon.name} className="h-20 w-20" />
    </CardHeader>

    <CardBody className="pt-10 pb-4 px-4 space-y-1 text-center">
      <p className="text-ms text-[#8f9396]">N°{pokemon.id}</p>
      <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
    </CardBody>

    <CardFooter className="pb-4 flex justify-center space-x-2">
      {pokemon.types.map((t) => (
        <span
          key={t}
          className={`
            inline-block px-4 py-1 rounded-md
            ${typeColorMap[t]} text-[#333333] text-sm font-medium
          `}
        >
          {t[0].toUpperCase() + t.slice(1)}
        </span>
      ))}
    </CardFooter>
  </Card>
);

export default PokemonCard;
