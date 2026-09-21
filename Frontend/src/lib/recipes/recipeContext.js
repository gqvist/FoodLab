import { createContext, useContext } from "react";

export const RecipeContext = createContext(null);

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useRecipes requires RecipeProvider");
  return context;
}
