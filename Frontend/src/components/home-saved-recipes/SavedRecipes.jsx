import "./SavedRecipes.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "../recipe-card/RecipeCard.jsx";
import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { getSavedRecipes } from "../../lib/recipes/getSavedRecipes.js";

function SavedRecipes({ showAll = false }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSavedRecipes() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getSavedRecipes();

        if (active) {
          setRecipes(result);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Kunde inte hämta sparade recept.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadSavedRecipes();

    return () => {
      active = false;
    };
  }, []);

  function handleSavedChange(
    recipeId,
    isSaved,
  ) {
    if (isSaved) {
      return;
    }

    setRecipes((currentRecipes) =>
      currentRecipes.filter(
        (recipe) => recipe.id !== recipeId,
      ),
    );
  }

  const visibleRecipes = showAll
    ? recipes
    : recipes.slice(0, 3);

  const Heading = showAll ? "h1" : "h2";

  return (
    <DashboardCard>
      <div className="saved-recipes-header">
        <div>
          <Heading>Sparade recept</Heading>

          <p>
            Recept från andra användare som du har
            sparat.
          </p>
        </div>

        {!showAll && (
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <Link to="/saved-recipes">
                Visa alla
              </Link>
            }
          />
        )}
      </div>

      {isLoading && (
        <p>Hämtar sparade recept...</p>
      )}

      {error && (
        <p role="alert">{error}</p>
      )}

      {!isLoading && !error && (
        <>
          <div className="saved-recipes-grid">
            {visibleRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSavedChange={
                  handleSavedChange
                }
              />
            ))}
          </div>

          {!recipes.length && (
            <p>
              Du har inga sparade recept...
            </p>
          )}
        </>
      )}
    </DashboardCard>
  );
}

export default SavedRecipes;