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
      relative group w-full
      bg-[#f6f8fc]           /* fond clair neumorphique */
      rounded-2xl
      overflow-visible       /* laisse l’image sortir */
      text-center
    `}
    style={{
      boxShadow: `
        -8px -8px 12px rgba(255, 255, 255, 0.8),
         8px  8px 12px rgba(0, 0, 0, 0.1)
      `,
    }}
  >

    <CardHeader className="
        absolute left-1/2 -translate-x-1/2 -mt-16 
        flex justify-center
        pointer-events-none
      ">
      <div
        className="
          transform transition-transform duration-100
          group-hover:scale-125   /* seul l’enfant s’agrandit */
          pointer-events-none
        "
      >
        <Image
          alt={pokemon.name}
          src={pokemon.sprite}
        />
      </div>
    </CardHeader>

    <CardBody className="pt-8 pb-4 px-4 text-center">
      <p className="text-xs relative top-3 text-[#8f9396] font-bold">
        N° {pokemon.id}
      </p>
      <h3 className="relative text-lg top-3 capitalize font-bold">
        {pokemon.name}
      </h3>
    </CardBody>

    <CardFooter className="pb-4 flex justify-center space-x-3">
      {pokemon.types.map((t) => (
        <span
          key={t}
          className={`
            inline-block px-3 py-px rounded-md
            ${typeColorMap[t]} text-[#333333] text-base font-bold
          `}
        >
          {t[0].toUpperCase() + t.slice(1)}
        </span>
      ))}
    </CardFooter>
  </Card>
);

export default PokemonCard;
