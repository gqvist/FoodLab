import "./PlanMeals.css";
import { useState } from "react";
import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { Switch } from "../ui/switch.jsx";
import { RefreshIcon } from "../../assets/icons/icons.jsx";

// Weekdays
const days = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

// Starting point switch toggle
function PlanMeals() {
  const [recipeFilters, setRecipeFilters] = useState({
    own: true,
    saved: false,
    all: false,
  });

  // Handle the logic with switch toggle logic with "alla recept"
  function handleAllRecipesChange(checked) {
    setRecipeFilters((currentFilters) => ({
      ...currentFilters,
      ...(checked && { own: false, saved: false }),
      all: checked,
    }));
  }

  // Handle the logic with switch toggle logic with "alla recept"
  function handleRecipeFilterChange(filter, checked) {
    setRecipeFilters((currentFilters) => ({
      ...currentFilters,
      [filter]: checked,
      ...(checked && { all: false }),
    }));
  }

  return (
    <DashboardCard>
      <div className="plan-meals-header">
        <div>
          <h1>Planera</h1>
          <p>Slumpa veckans mat enskilt eller alla samtidigt.</p>
        </div>

        <div
          className="plan-meals-filters"
          role="group"
          aria-label="Välj recept"
        >
          <label className="plan-meals-filter" htmlFor="own-recipes">
            <span>Dina recept</span>
            <Switch
              id="own-recipes"
              size="sm"
              checked={recipeFilters.own}
              onCheckedChange={(checked) =>
                handleRecipeFilterChange("own", checked)
              }
            />
          </label>

          <label className="plan-meals-filter" htmlFor="saved-recipes">
            <span>Sparade recept</span>
            <Switch
              id="saved-recipes"
              size="sm"
              checked={recipeFilters.saved}
              onCheckedChange={(checked) =>
                handleRecipeFilterChange("saved", checked)
              }
            />
          </label>

          <label className="plan-meals-filter" htmlFor="all-recipes">
            <span>Alla recept</span>
            <Switch
              id="all-recipes"
              size="sm"
              checked={recipeFilters.all}
              onCheckedChange={handleAllRecipesChange}
            />
          </label>
        </div>
      </div>

      <div className="plan-meals-grid">
        {days.map((day) => (
          <div className="plan-meals-column" key={day}>
            <div className="plan-meals-day">
              <span className="plan-meals-day-name">{day}</span>
            </div>

            <Button
              className="plan-meals-refresh"
              variant="outline"
              size="icon-sm"
              aria-label={`Byt måltid för ${day}`}
            >
              <RefreshIcon aria-hidden="true" />
            </Button>
          </div>
        ))}
      </div>

      <div className="plan-meals-randomize">
        <Button>Slumpa alla</Button>
      </div>
    </DashboardCard>
  );
}

export default PlanMeals;
