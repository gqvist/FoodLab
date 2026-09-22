import RecipeCard from "../recipe-card/RecipeCard.jsx";
import "./SavedRecipes.css";
import { Link } from "react-router-dom";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { useRecipes } from "../../lib/recipes/recipeContext";

function SavedRecipes({ showAll = false }) {
  const { recipes, savedIds, currentUserId } = useRecipes();
  const savedRecipes = recipes.filter(
    (recipe) =>
      savedIds.includes(recipe.id) &&
      recipe.isPublic &&
      recipe.ownerId !== currentUserId,
  );
  const visibleRecipes = showAll ? savedRecipes : savedRecipes.slice(0, 3);
  const Heading = showAll ? "h1" : "h2";
  return (
    <DashboardCard>
      <div className="saved-recipes-header">
        <div>
          <Heading>Sparade recept</Heading>
          <p>Recept från andra användare som du har sparat.</p>
        </div>

        {!showAll && (
          <Button
            variant="outline"
            render={
              <Link
                to={`/pages/saved-recipes/${encodeURIComponent(currentUserId)}`}
              >
                Visa alla
              </Link>
            }
          />
        )}
      </div>

      <div className="saved-recipes-grid">
        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {!savedRecipes.length && <p>Du har inte sparat några recept ännu.</p>}
    </DashboardCard>
  );
}

export default SavedRecipes;
