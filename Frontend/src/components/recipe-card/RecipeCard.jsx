import "./RecipeCard.css";

import { Link } from "react-router-dom";

import { RatingIcon } from "../../assets/icons/icons";
import RecipeSaveButton from "./RecipeSaveButton";

export default function RecipeCard({ recipe, onSavedChange }) {
  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
        <h3>{recipe.name}</h3>

        <div className="recipe-card-info">
          <span>{recipe.cookingTimeMinutes} min</span>
          <span
            className="recipe-card-rating"
            aria-label={
              recipe.averageRating == null
                ? "Receptet har inga betyg ännu"
                : `Genomsnittligt betyg: ${Number(recipe.averageRating).toFixed(1)} av 5`
            }
          >
            <RatingIcon size={14} fill="currentColor" aria-hidden="true" />
            {recipe.averageRating == null
              ? "–"
              : Number(recipe.averageRating).toFixed(1)}
          </span>
        </div>
      </Link>
      <div className="recipe-card-action">
        <RecipeSaveButton
          key={recipe.id}
          recipe={recipe}
          onSavedChange={onSavedChange}
        />
      </div>
    </article>
  );
}
