import "./SavedRecipes.css"

import DashboardCard from "../dashboard-card/DashBoardCard.jsx"
import { Button } from "../ui/button.jsx"
import { savedRecipes } from "../../assets/test-data/homeTestData.js"

function SavedRecipes() {
  return (
    <DashboardCard>
      <div className="saved-recipes-header">
        <div>
          <h2>Sparade recept</h2>
          <p>Recept från andra användare som du har sparat.</p>
        </div>

        <Button variant="outline">
          Visa alla
        </Button>
      </div>

      <div className="saved-recipes-grid">
        {savedRecipes.map((recipe) => (
          <div className="saved-recipe-card" key={recipe.id}>
            <h3>{recipe.name}</h3>

            <div className="saved-recipe-info">
              <span>{recipe.cookingTimeMinutes} min</span>
              <span>★ {recipe.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

export default SavedRecipes