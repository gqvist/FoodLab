import "./RecipeRating.css";

import { useState } from "react";

import { RatingIcon } from "../../assets/icons/icons";
import { Alert, AlertDescription } from "../ui/alert.jsx";
import { Button } from "../ui/button.jsx";
import { rateRecipe } from "../../lib/recipes/rateRecipe";

const ratingValues = [1, 2, 3, 4, 5];

export default function RecipeRating({ recipe, onRated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredRating, setHoveredRating] = useState(null);

  async function handleRating(value) {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await rateRecipe(recipe.id, value);
      await onRated?.();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Kunde inte spara betyget.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const averageText =
    recipe.averageRating == null
      ? "–"
      : Number(recipe.averageRating).toFixed(1);

  const displayedRating = hoveredRating ?? recipe.currentUserRating ?? 0;

  return (
    <div className="recipe-rating">
      <div
        className="recipe-rating-average"
        aria-label={
          recipe.averageRating == null
            ? "Receptet har inga betyg ännu"
            : `Genomsnittligt betyg: ${averageText} av 5`
        }
      >
        <RatingIcon size={18} fill="currentColor" aria-hidden="true" />
        <span>{averageText}</span>
      </div>

      {!recipe.isOwner && recipe.isPublic && (
        <div className="recipe-rating-input">
          <span>Betygsätt:</span>

          <div
            className="recipe-rating-controls"
            role="group"
            aria-label="Betygsätt receptet"
            onMouseLeave={() => setHoveredRating(null)}
          >
            {ratingValues.map((value) => {
              const isSelected = recipe.currentUserRating === value;
              const isFilled = value <= displayedRating;

              return (
                <Button
                  key={value}
                  type="button"
                  className={`recipe-rating-button${
                    isFilled ? " recipe-rating-button-filled" : ""
                  }`}
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`${value} av 5 stjärnor`}
                  aria-pressed={isSelected}
                  disabled={isLoading}
                  onMouseEnter={() => setHoveredRating(value)}
                  onFocus={() => setHoveredRating(value)}
                  onBlur={() => setHoveredRating(null)}
                  onClick={() => handleRating(value)}
                >
                  <RatingIcon
                    size={18}
                    fill={isFilled ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <Alert className="recipe-rating-error" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
