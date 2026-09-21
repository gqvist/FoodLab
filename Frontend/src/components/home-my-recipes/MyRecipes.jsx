import RecipeCard from "../recipe-card/RecipeCard.jsx";
import "./MyRecipes.css";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { useRecipes } from "../../lib/recipes/recipeContext";

function MyRecipes() {
  const { recipes, currentUserId } = useRecipes();
  const myRecipes = recipes.filter((recipe) => recipe.ownerId === currentUserId);
  return (
    <DashboardCard>
      <div className="my-recipes-header">
        <div>
          <h2>Mina recept</h2>
          <p>Recept som du har skapat.</p>
        </div>

        <div className="my-recipes-actions">
          <Button>+ Nytt recept</Button>
          <Button variant="outline">Visa alla</Button>
        </div>
      </div>

      <div className="my-recipes-grid">
        {myRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </DashboardCard>
  );
}

export default MyRecipes;
