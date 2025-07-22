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
    group                     
    w-full
    bg-white rounded-2xl
    overflow-visible text-center

    border-2 border-transparent
    hover:border-[#c2c2c2]
    transition-colors duration-300 

    shadow-sm hover:shadow-md
  `}
  >
    <CardHeader className="absolute left-1/2 -translate-x-1/2 -mt-16 flex justify-center">
      <Image
        alt={pokemon.name}
        className="
          h-30 w-30
          group-hover:scale-110  
        "
        src={pokemon.sprite}
      />
    </CardHeader>

    <CardBody className="pt-8 pb-4 px-4 text-center">
      <p className="text-xs relative top-3 text-[#8f9396] font-bold ">
        N°{pokemon.id}
      </p>
      <h3 className="relative text-lg top-3 font-semibold capitalize font-bold ">
        {pokemon.name}
      </h3>
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
