import "./RecipesPage.css";

import { useEffect, useState } from "react";

import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import BackLink from "../../components/back-link/BackLink";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { getPublicRecipes } from "../../lib/recipes/getPublicRecipes.js";

const sortLabels = {
  nyaste: "Nyaste",
  tillagningstid: "Tillagningstid",
  betyg: "Betyg",
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("nyaste");

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

  const sortedRecipes = [...recipes].sort((firstRecipe, secondRecipe) => {
    const newestFirst =
      new Date(secondRecipe.createdAt) - new Date(firstRecipe.createdAt);

    if (sortBy === "tillagningstid") {
      return (
        firstRecipe.cookingTimeMinutes - secondRecipe.cookingTimeMinutes ||
        newestFirst
      );
    }

    if (sortBy === "betyg") {
      const firstRating = firstRecipe.averageRating ?? -1;
      const secondRating = secondRecipe.averageRating ?? -1;

      return secondRating - firstRating || newestFirst;
    }

    return newestFirst;
  });

  return (
    <>
      <TopNav />

      <main className="recipes-page">
        <div className="recipes-container">
          <DashboardCard>
            <div className="recipes-header">
              <div>
                <h1>Recept</h1>

                <p className="recipes-intro">
                  Upptäck och spara offentliga recept.
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className="recipes-sort-trigger"
                  aria-label="Sortera recept"
                >
                  <SelectValue>
                    {(value) => sortLabels[value] ?? value}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent
                  side="bottom"
                  align="end"
                  alignItemWithTrigger={false}
                >
                  <SelectItem value="nyaste">Nyaste</SelectItem>
                  <SelectItem value="tillagningstid">
                    Tillagningstid
                  </SelectItem>
                  <SelectItem value="betyg">Betyg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading && <p>Hämtar recept...</p>}

            {error && <p role="alert">{error}</p>}

            {!isLoading && !error && (
              <>
                <div className="recipes-grid">
                  {sortedRecipes.map((recipe) => (
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
