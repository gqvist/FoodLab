import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import { useRecipes } from "../../lib/recipes/recipeContext";
import "./RecipesPage.css";

export default function RecipesPage() {
  const { recipes } = useRecipes();
  const publicRecipes = recipes.filter((recipe) => recipe.isPublic);
  return <>
    <TopNav />
    <main className="recipes-page">
      <div className="recipes-container">
        <DashboardCard>
          <h1>Recept</h1>
          <p className="recipes-intro">Upptäck och spara offentliga recept.</p>
          <div className="recipes-grid">
            {publicRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
          {!publicRecipes.length && <p>Det finns inga offentliga recept ännu.</p>}
        </DashboardCard>
      </div>
    </main>
  </>;
}
