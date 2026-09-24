import "./RecipesPage.css";

import { useEffect, useState } from "react";

import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import BackLink from "../../components/back-link/BackLink";
import { getPublicRecipes } from "../../lib/recipes/getPublicRecipes.js";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRecipes() {
      try {
        const result = await getPublicRecipes();

        if (active) {
          setRecipes(result);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof TypeError
              ? "Kunde inte ansluta till servern. Försök igen."
              : loadError.message,
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <TopNav />

      <main className="recipes-page">
        <div className="recipes-container">
          <DashboardCard>
            <h1>Recept</h1>

            <p className="recipes-intro">
              Upptäck och spara offentliga recept.
            </p>

            {isLoading && <p>Hämtar recept...</p>}

            {error && <p role="alert">{error}</p>}

            {!isLoading && !error && (
              <>
                <div className="recipes-grid">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>

                {!recipes.length && (
                  <p>Det finns inga offentliga recept ännu.</p>
                )}
              </>
            )}
          </DashboardCard>

          <BackLink />
        </div>
      </main>
    </>
  );
}
