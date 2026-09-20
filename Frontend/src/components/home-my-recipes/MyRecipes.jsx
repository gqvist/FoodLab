import "./MyRecipes.css"

import DashboardCard from "@/components/dashboard-card/DashboardCard"
import { Button } from "@/components/ui/button"
import { myRecipes } from "@/assets/test-data/homeTestData"

function MyRecipes() {
  return (
    <DashboardCard>
      <div className="my-recipes-header">
        <div>
          <h2>Mina recept</h2>
          <p>Recept som du har skapat.</p>
        </div>

        <Button>
          + Nytt recept
        </Button>
      </div>

      <div className="my-recipes-grid">
        {myRecipes.map((recipe) => (
          <div className="my-recipe-card" key={recipe.id}>
            <h3>{recipe.name}</h3>

            <div className="my-recipe-info">
              <span>{recipe.cookingTimeMinutes} min</span>
              <span>★ {recipe.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

export default MyRecipes