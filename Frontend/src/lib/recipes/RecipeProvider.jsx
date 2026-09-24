import { useState } from "react";
import { RecipeContext } from "./recipeContext";

export default function RecipeProvider({ children }) {
  const [recipes] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [ratings, setRatings] = useState({});
  const currentUserId = null;

  function canInteract(id) {
    return recipes.some(
      (recipe) =>
        recipe.id === id && recipe.isPublic && recipe.ownerId !== currentUserId,
    );
  }

  function toggleSaved(id) {
    if (!canInteract(id)) return;
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id],
    );
  }

  function rateRecipe(id, value) {
    if (!canInteract(id) || !Number.isInteger(value) || value < 1 || value > 5)
      return;
    setRatings((previous) => ({ ...previous, [id]: value }));
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        currentUserId,
        savedIds,
        ratings,
        toggleSaved,
        rateRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
