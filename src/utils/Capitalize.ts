import exp from "constants";

// Met en capital la première lettre d'une chaîne
function capitalize(str: string): string {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default capitalize;
