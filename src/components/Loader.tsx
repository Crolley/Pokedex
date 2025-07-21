// src/components/Loader.tsx
import React, { useEffect, useState } from "react";

import ectoGif from "../assets/Ectoplasma.gif"; // ou le chemin où tu as mis ton GIF

interface LoaderProps {
  loading: boolean;
  onExited: () => void;
}

const Loader: React.FC<LoaderProps> = ({ loading, onExited }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!loading) {
      setExiting(true);
      const timer = setTimeout(onExited, 700);

      return () => clearTimeout(timer);
    }
  }, [loading, onExited]);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-[#505070] text-white
        transform transition-transform duration-000
        ${exiting ? "translate-y-full" : "translate-y-0"}
      `}
    >
      {/* Remplace le spinner par ton GIF */}
      <img
        alt="Chargement…"
        src={ectoGif}
      />
    </div>
  );
};

export default Loader;
