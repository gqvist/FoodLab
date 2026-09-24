import { Link } from "react-router-dom";
import { RatingIcon } from "../../assets/icons/icons";
import RecipeSaveButton from "./RecipeSaveButton";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
        <h3>{recipe.name}</h3>

        <div className="recipe-card-info">
          <span>{recipe.cookingTimeMinutes} min</span>
          {recipe.rating != null && (
            <span
              className="recipe-card-rating"
              aria-label={`Genomsnittligt betyg: ${recipe.rating} av 5`}
            >
              <RatingIcon size={14} aria-hidden="true" />
              {recipe.rating}
            </span>
          )}
        </div>
      </Link>
      <div className="recipe-card-action">
        <RecipeSaveButton recipe={recipe} />
      </div>
    </article>
  );
}
