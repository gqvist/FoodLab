import "./RecipeCard.css";

import { Link } from "react-router-dom";

import { ClockIcon, StarIcon } from "lucide-react";

import { Badge } from "../ui/badge.jsx";
import { Card, CardContent, CardTitle } from "../ui/card.jsx";
import RecipeSaveButton from "./RecipeSaveButton";

export default function RecipeCard({ recipe, onSavedChange }) {
  return (
    <Card className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
        <CardTitle className="recipe-card-title">{recipe.name}</CardTitle>

        <CardContent className="recipe-card-info">
          <Badge variant="secondary">
            <ClockIcon aria-hidden="true" />
            {recipe.cookingTimeMinutes} min
          </Badge>
          <Badge
            variant="secondary"
            className="recipe-card-rating"
            aria-label={
              recipe.averageRating == null
                ? "Receptet har inga betyg ännu"
                : `Genomsnittligt betyg: ${Number(recipe.averageRating).toFixed(1)} av 5`
            }
          >
            <StarIcon fill="currentColor" aria-hidden="true" />
            {recipe.averageRating == null
              ? "–"
              : Number(recipe.averageRating).toFixed(1)}
          </Badge>
        </CardContent>
      </Link>
      <div className="recipe-card-action">
        <RecipeSaveButton
          key={recipe.id}
          recipe={recipe}
          onSavedChange={onSavedChange}
        />
      </div>
    </Card>
  );
}
