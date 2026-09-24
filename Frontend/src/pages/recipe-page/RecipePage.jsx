import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import "./RecipePage.css";
import BackLink from "../../components/back-link/BackLink";
import RecipeSaveButton from "../../components/recipe-card/RecipeSaveButton";
import { getRecipeById } from "../../lib/recipes/getRecipeById";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let shouldUpdate = true;

    async function loadRecipe() {
      try {
        setIsLoading(true);
        setError("");

        const fetchedRecipe = await getRecipeById(id);

        if (shouldUpdate) {
          setRecipe(fetchedRecipe);
        }
      } catch (requestError) {
        if (shouldUpdate) {
          setError(requestError.message);
        }
      } finally {
        if (shouldUpdate) {
          setIsLoading(false);
        }
      }
    }

    loadRecipe();

    return () => {
      shouldUpdate = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <>
        <TopNav />
        <main className="recipe-page">
          <div className="recipe-container">
            <DashboardCard>
              <p>Hämtar receptet...</p>
            </DashboardCard>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopNav />
        <main className="recipe-page">
          <div className="recipe-container">
            <DashboardCard>
              <h1>Något gick fel</h1>
              <p>{error}</p>
            </DashboardCard>
            <BackLink />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNav />

      <main className="recipe-page">
        <div className="recipe-container">
          {recipe ? (
            <article className="recipe-details">
              <DashboardCard className="recipe-summary">
                <div className="recipe-summary-heading">
                  <h1>{recipe.name}</h1>
                  <RecipeSaveButton recipe={recipe} />
                </div>

                <p>{recipe.description || "Beskrivning saknas."}</p>
              </DashboardCard>

              <DashboardCard className="recipe-ingredients-card">
                <h2>Ingredienser</h2>
                {recipe.ingredients?.length ? (
                  <ul className="recipe-ingredients">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Ingredienser saknas.</p>
                )}
              </DashboardCard>

              <DashboardCard className="recipe-instructions-card">
                <h2>Gör så här</h2>
                <p className="recipe-instructions">
                  {recipe.instructions || "Instruktioner saknas."}
                </p>
              </DashboardCard>
            </article>
          ) : (
            <DashboardCard>
              <h1>Receptet hittades inte.</h1>
            </DashboardCard>
          )}
          <BackLink />
        </div>
      </main>
    </>
  );
}
