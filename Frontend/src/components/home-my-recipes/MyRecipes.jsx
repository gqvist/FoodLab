import "./MyRecipes.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "../recipe-card/RecipeCard.jsx";
import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { getMyRecipes } from "../../lib/recipes/getMyRecipes.js";

function MyRecipes({ showAll = false }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRecipes() {
      try {
        const result = await getMyRecipes();

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

  const visibleRecipes = showAll ? recipes : recipes.slice(0, 3);

  const Heading = showAll ? "h1" : "h2";

  return (
    <DashboardCard>
      <div className="my-recipes-header">
        <div>
          <Heading>Mina recept</Heading>
          <p>Recept som du har skapat.</p>
        </div>

        <div className="my-recipes-actions">
          <Button
            nativeButton={false}
            render={<Link to="/recipe/new">+ Nytt recept</Link>}
          />

          {!showAll && (
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link to="/my-recipes">Visa alla</Link>}
            />
          )}
        </div>
      </div>

      {isLoading && <p>Hämtar dina recept...</p>}

      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="my-recipes-grid">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {!recipes.length && <p>Du har inte skapat några recept än...</p>}
        </>
      )}
    </DashboardCard>
  );
}

export default MyRecipes;
