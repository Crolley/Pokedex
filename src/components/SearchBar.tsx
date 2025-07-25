// src/components/SearchBar.tsx
import React, { ChangeEvent, useState, useEffect } from "react";
import SP from "../assets/SP.png";

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  debounceTime?: number;  
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher un Pokémon…",
  className = "",
  debounceTime = 300,      // délai 
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    // Si la valeur est vide, pas de timer
    if (localValue === "") {
      if (value !== "") {
        onChange("");
      }
      return;
    }

    const handle = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceTime);

    return () => clearTimeout(handle);
  }, [localValue, debounceTime, onChange, value]);
  return (
    <div
      className={`
        relative w-full
        max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl
        mx-auto
        ${className}
      `}
    >
      <img
        src={SP}
        alt="Recherche"
        className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6"
      />
      <input
        type="text"
        value={localValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLocalValue(e.target.value)
        }
        placeholder={placeholder}
        className={`
          w-full pl-12 pr-4 py-2
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-300
          transition
        `}
      />
    </div>
  );
};

export default SearchBar;
