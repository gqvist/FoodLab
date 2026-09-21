import { useParams } from "react-router-dom";
import TopNav from "../../components/top-nav/TopNav";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import { recipes } from "../../assets/test-data/homeTestData";
import "./RecipePage.css";
import BackLink from "../../components/back-link/BackLink";
import RecipeSaveButton from "../../components/recipe-card/RecipeSaveButton";
import RecipeRating from "../../components/recipe-rating/RecipeRating";
import { RatingIcon } from "../../assets/icons/icons";

export default function RecipePage() {
  const { id } = useParams();

  const recipe = recipes.find(
    (recipe) => recipe.id === Number(id),
  );

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
                <div className="recipe-rating-row">
                  <RecipeRating key={recipe.id} recipe={recipe} />
                  <div className="recipe-average-rating" aria-label={`Genomsnittligt betyg: ${recipe.rating} av 5`}>
                    <RatingIcon size={15} fill="currentColor" aria-hidden="true" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
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
