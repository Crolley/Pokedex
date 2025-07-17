import { heroui } from "@heroui/theme";
import { g } from "framer-motion/client";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        poison: "#bc76ae",
        grass: "#93d776",
        fire: "#ff6849",
        flying: "#85aeff",
        water: "#59aeff",
        bug: "#bcc949",
        normal: "#c9c9bd",
        electric: "#ffd759",
        ground: "#e5c976",
        fairy: "#ffbdff",
        fighting: "#c97668",
        psychic: "#ff76ae",
        steel: "#bcbdc9",
        ice: "#93e5ff",
        ghost: "#8585c9",
        rock: "#c9bd85",
        dark: "#937668",
        dragon: "#9385f2",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
