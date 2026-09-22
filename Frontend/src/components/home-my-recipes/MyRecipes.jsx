import RecipeCard from "../recipe-card/RecipeCard.jsx";
import "./MyRecipes.css";
import { Link } from "react-router-dom";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { useRecipes } from "../../lib/recipes/recipeContext";

function MyRecipes({ showAll = false }) {
  const { recipes, currentUserId } = useRecipes();
  const myRecipes = recipes.filter(
    (recipe) => recipe.ownerId === currentUserId,
  );
  const visibleRecipes = showAll ? myRecipes : myRecipes.slice(0, 3);
  const Heading = showAll ? "h1" : "h2";
  return (
    <DashboardCard>
      <div className="my-recipes-header">
        <div>
          <Heading>Mina recept</Heading>
          <p>Recept som du har skapat.</p>
        </div>

        <div className="my-recipes-actions">
          <Button>+ Nytt recept</Button>
          {!showAll && (
            <Button
              variant="outline"
              render={
                <Link
                  to={`/pages/my-recipes/${encodeURIComponent(currentUserId)}`}
                >
                  Visa alla
                </Link>
              }
            />
          )}
        </div>
      </div>

      <div className="my-recipes-grid">
        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {!myRecipes.length && <p>Du har inte skapat några recept ännu.</p>}
    </DashboardCard>
  );
}

export default MyRecipes;
