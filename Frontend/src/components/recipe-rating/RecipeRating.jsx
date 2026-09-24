import { useId, useState } from "react";
import { RatingIcon } from "../../assets/icons/icons";
import { useRecipes } from "../../lib/recipes/recipeContext";
import "./RecipeRating.css";

export default function RecipeRating({ recipe }) {
  const { currentUserId, ratings, rateRecipe } = useRecipes();
  const [preview, setPreview] = useState(0);
  const name = useId();
  const selected = ratings[recipe.id] || 0;
  const isOwner = recipe.ownerId === currentUserId;
  const disabled = !recipe.isPublic;

  if (isOwner) return null;

  return (
    <div
      className="recipe-rating"
      role="radiogroup"
      aria-labelledby={`${name}-label`}
      aria-disabled={disabled}
    >
      <span id={`${name}-label`}>Ditt betyg:</span>
      <div className="recipe-rating-stars" onMouseLeave={() => setPreview(0)}>
        {[1, 2, 3, 4, 5].map((value) => (
          <label
            key={value}
            className="recipe-rating-option"
            onMouseEnter={() => !disabled && setPreview(value)}
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={selected === value}
              disabled={disabled}
              aria-label={`${value} av 5 stjärnor`}
              onChange={() => rateRecipe(recipe.id, value)}
            />
            <RatingIcon
              size={15}
              aria-hidden="true"
              fill={value <= (preview || selected) ? "currentColor" : "none"}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
