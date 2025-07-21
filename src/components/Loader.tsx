// src/components/Loader.tsx
import React, { useEffect, useState } from "react";

import ectoGif from "../assets/ectoplasma.gif";

interface LoaderProps {
  loading: boolean;
  onExited: () => void;
}

const Loader: React.FC<LoaderProps> = ({ loading, onExited }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!loading) {
      // 2 s d’affichage, puis on déclenche la fermeture du cercle
      const waitTimer = setTimeout(() => {
        setExiting(true);
        // après la transition (700 ms), on retire du DOM
        const exitTimer = setTimeout(onExited, 700);
        return () => clearTimeout(exitTimer);
      }, 2000);

      return () => clearTimeout(waitTimer);
    }
  }, [loading, onExited]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#505070]"
      style={{
        // clip-path passe de 150% à 0%
        clipPath: exiting ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: "clip-path 700ms ease-in-out",
      }}
    >
      <img
        alt="Chargement…"
        className="max-w-full max-h-screen object-contain"
        src={ectoGif}
      />
    </div>
  );
};

export default Loader;
