import { useState } from "react";
import { recipes, savedRecipes } from "../../assets/test-data/homeTestData";
import { RecipeContext } from "./recipeContext";

// Temporary frontend identity, independent of backend login.
const currentUserId = "demo-user";

export default function RecipeProvider({ children }) {
  const [savedIds, setSavedIds] = useState(savedRecipes.map((recipe) => recipe.id));
  const [ratings, setRatings] = useState({});

  function canInteract(id) {
    return recipes.some((recipe) =>
      recipe.id === id && recipe.isPublic && recipe.ownerId !== currentUserId
    );
  }

  function toggleSaved(id) {
    if (!canInteract(id)) return;
    setSavedIds((ids) => ids.includes(id)
      ? ids.filter((savedId) => savedId !== id)
      : [...ids, id]);
  }

  function rateRecipe(id, value) {
    if (!canInteract(id) || !Number.isInteger(value) || value < 1 || value > 5) return;
    setRatings((previous) => ({ ...previous, [id]: value }));
  }

  return (
    <RecipeContext.Provider value={{ recipes, currentUserId, savedIds, ratings, toggleSaved, rateRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}
