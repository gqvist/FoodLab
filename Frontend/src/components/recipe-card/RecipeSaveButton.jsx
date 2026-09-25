import "./RecipeCard.css";

import { useState } from "react";

import { ProfileIcon, SaveIcon } from "../../assets/icons/icons";
import { saveRecipe } from "../../lib/recipes/saveRecipe";
import { unsaveRecipe } from "../../lib/recipes/unsaveRecipe";

export default function RecipeSaveButton({ recipe, onSavedChange }) {
  const [isSaved, setIsSaved] = useState(Boolean(recipe.isSaved));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (isLoading) {
      return;
    }

    const newSavedState = !isSaved;

    try {
      setIsLoading(true);
      setError("");

      if (newSavedState) {
        await saveRecipe(recipe.id);
      } else {
        await unsaveRecipe(recipe.id);
      }

      setIsSaved(newSavedState);

      onSavedChange?.(recipe.id, newSavedState);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Kunde inte ändra det sparade receptet.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (recipe.isOwner) {
    return (
      <span
        className="recipe-owner"
        role="img"
        aria-label="Ditt recept"
        title="Ditt recept"
      >
        <ProfileIcon size={20} aria-hidden="true" />
      </span>
    );
  }

  if (!recipe.isPublic) {
    return null;
  }

  const buttonLabel = isSaved
    ? `Ta bort ${recipe.name} från sparade recept`
    : `Spara ${recipe.name}`;

  return (
    <>
      <button
        type="button"
        className="recipe-save"
        aria-pressed={isSaved}
        aria-label={buttonLabel}
        aria-describedby={error ? `save-error-${recipe.id}` : undefined}
        title={error || (isSaved ? "Ta bort sparat recept" : "Spara recept")}
        disabled={isLoading}
        onClick={handleClick}
      >
        <SaveIcon
          size={20}
          fill={isSaved ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </button>

      {error && (
        <span
          id={`save-error-${recipe.id}`}
          className="recipe-save-message"
          role="alert"
        >
          {error}
        </span>
      )}
    </>
  );
}
