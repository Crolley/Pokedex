// src/components/SearchBar.tsx
import React, { ChangeEvent } from "react";
import SP from "../assets/SP.png"; // adapte le chemin si besoin

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher…",
  className = "",
}) => {
  return (
    <div
      className={`
        relative w-full
        max-w-md          
        sm:max-w-lg       
        md:max-w-xl       
        lg:max-w-2xl      
        xl:max-w-2xl      
        mx-auto
      `}
    >
      <img
        src={SP}
        alt="Recherche"
        className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6"
      />
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className={`
          w-full
          pl-12 pr-4 py-2
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-300
          transition
        `}
      />
    </div>
  );
};

export default SearchBar;
