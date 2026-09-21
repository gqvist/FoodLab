import RecipeCard from "../recipe-card/RecipeCard.jsx";
import "./SavedRecipes.css";


import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { useRecipes } from "../../lib/recipes/recipeContext";

function SavedRecipes() {
  const { recipes, savedIds, currentUserId } = useRecipes();
  const savedRecipes = recipes.filter((recipe) =>
    savedIds.includes(recipe.id) && recipe.isPublic && recipe.ownerId !== currentUserId
  );
  return (
    <DashboardCard>
      <div className="saved-recipes-header">
        <div>
          <h2>Sparade recept</h2>
          <p>Recept från andra användare som du har sparat.</p>
        </div>

        <Button variant="outline">Visa alla</Button>
      </div>

      <div className="saved-recipes-grid">
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {!savedRecipes.length && <p>Du har inte sparat några recept ännu.</p>}
    </DashboardCard>
  );
}

export default SavedRecipes;
