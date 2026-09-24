import { useState } from "react";
import { RecipeContext } from "./recipeContext";

export default function RecipeProvider({ children }) {
  const [recipes] = useState([]);
  const [ratings, setRatings] = useState({});
  const currentUserId = null;

  function canInteract(id) {
    return recipes.some(
      (recipe) =>
        recipe.id === id && recipe.isPublic && recipe.ownerId !== currentUserId,
    );
  }

  function rateRecipe(id, value) {
    if (
      !canInteract(id) ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 5
    ) {
      return;
    }

    setRatings((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        currentUserId,
        ratings,
        rateRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
