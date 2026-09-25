import "./PlanMeals.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { Switch } from "../ui/switch.jsx";
import { RefreshIcon, SaveIcon2 } from "../../assets/icons/icons.jsx";
import { getMealPlan } from "../../lib/meal-plan/getMealPlan.js";
import { randomizeMealPlan } from "../../lib/meal-plan/randomizeMealPlan.js";
import { saveMealPlan } from "../../lib/meal-plan/saveMealPlan.js";

const days = [
  { dayOfWeek: 1, name: "Måndag" },
  { dayOfWeek: 2, name: "Tisdag" },
  { dayOfWeek: 3, name: "Onsdag" },
  { dayOfWeek: 4, name: "Torsdag" },
  { dayOfWeek: 5, name: "Fredag" },
  { dayOfWeek: 6, name: "Lördag" },
  { dayOfWeek: 7, name: "Söndag" },
];

function PlanMeals({ onSaved }) {
  const [draftPlan, setDraftPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isRandomizingAll, setIsRandomizingAll] = useState(false);
  const [randomizingDay, setRandomizingDay] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [recipeFilters, setRecipeFilters] = useState({
    own: true,
    saved: false,
    all: false,
  });

  const hasSelectedSource =
    recipeFilters.own || recipeFilters.saved || recipeFilters.all;

  const isRandomizing = isRandomizingAll || randomizingDay !== null;

  const hasPlannedRecipe = draftPlan.some((day) => day.recipe);
  const isBusy = isRandomizing || isSaving;

  useEffect(() => {
    let active = true;

    async function loadMealPlan() {
      try {
        setIsLoading(true);
        setLoadError("");

        const result = await getMealPlan();

        if (active) {
          setDraftPlan(result.days);
        }
      } catch (requestError) {
        if (active) {
          setLoadError(
            requestError instanceof Error
              ? requestError.message
              : "Kunde inte hämta planeringen.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadMealPlan();

    return () => {
      active = false;
    };
  }, []);

  function handleAllRecipesChange(checked) {
    setRecipeFilters((currentFilters) => ({
      ...currentFilters,
      ...(checked && { own: false, saved: false }),
      all: checked,
    }));
  }

  function handleRecipeFilterChange(filter, checked) {
    setRecipeFilters((currentFilters) => ({
      ...currentFilters,
      [filter]: checked,
      ...(checked && { all: false }),
    }));
  }

  async function handleRandomizeAll() {
    if (!hasSelectedSource || isBusy) {
      return;
    }

    try {
      setIsRandomizingAll(true);
      setActionError("");

      const recipes = await randomizeMealPlan({
        includeOwn: recipeFilters.own,
        includeSaved: recipeFilters.saved,
        includePublic: recipeFilters.all,
        count: 7,
        excludedRecipeIds: [],
      });

      const randomizedPlan = days.map(({ dayOfWeek }, index) => ({
        dayOfWeek,
        recipe: recipes[index],
      }));

      setDraftPlan(randomizedPlan);
    } catch (requestError) {
      setActionError(
        requestError instanceof Error
          ? requestError.message
          : "Kunde inte slumpa planeringen.",
      );
    } finally {
      setIsRandomizingAll(false);
    }
  }

  async function handleRandomizeDay(dayOfWeek) {
    if (!hasSelectedSource || isBusy) {
      return;
    }

    try {
      setRandomizingDay(dayOfWeek);
      setActionError("");

      const excludedRecipeIds = draftPlan
        .filter((day) => day.recipe)
        .map((day) => day.recipe.id);

      const recipes = await randomizeMealPlan({
        includeOwn: recipeFilters.own,
        includeSaved: recipeFilters.saved,
        includePublic: recipeFilters.all,
        count: 1,
        excludedRecipeIds,
      });

      const [randomRecipe] = recipes;

      if (!randomRecipe) {
        throw new Error("Servern returnerade inget recept.");
      }

      setDraftPlan((currentPlan) =>
        currentPlan.map((day) =>
          day.dayOfWeek === dayOfWeek
            ? {
                ...day,
                recipe: randomRecipe,
              }
            : day,
        ),
      );
    } catch (requestError) {
      setActionError(
        requestError instanceof Error
          ? requestError.message
          : "Kunde inte slumpa receptet.",
      );
    } finally {
      setRandomizingDay(null);
    }
  }

  async function handleSave() {
    if (!hasPlannedRecipe || isBusy) {
      return;
    }

    try {
      setIsSaving(true);
      setActionError("");
      setSaveMessage("");

      const savedPlan = await saveMealPlan(draftPlan);

      setDraftPlan(savedPlan.days);
      setSaveMessage("Planeringen har sparats.");
      onSaved?.();
    } catch (requestError) {
      setActionError(
        requestError instanceof Error
          ? requestError.message
          : "Kunde inte spara planeringen.",
      );
    } finally {
      setIsSaving(false);
    }
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
              disabled={isBusy}
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
              disabled={isBusy}
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
              disabled={isBusy}
              onCheckedChange={handleAllRecipesChange}
            />
          </label>
        </div>
      </div>

      {isLoading && <p className="plan-meals-message">Hämtar planeringen...</p>}

      {loadError && (
        <p className="plan-meals-message plan-meals-error" role="alert">
          {loadError}
        </p>
      )}

      {!isLoading && !loadError && (
        <>
          <div className="plan-meals-grid">
            {days.map(({ dayOfWeek, name }) => {
              const planDay = draftPlan.find(
                (day) => day.dayOfWeek === dayOfWeek,
              );

              const recipe = planDay?.recipe;

              return (
                <div className="plan-meals-column" key={dayOfWeek}>
                  {recipe ? (
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="plan-meals-day plan-meals-day-link"
                      aria-label={`${name}: ${recipe.name}`}
                    >
                      <span className="plan-meals-day-name">{name}</span>
                      <span className="plan-meals-recipe">{recipe.name}</span>
                      <span className="plan-meals-recipe-info">
                        {recipe.cookingTimeMinutes} min
                      </span>
                    </Link>
                  ) : (
                    <div className="plan-meals-day">
                      <span className="plan-meals-day-name">{name}</span>
                      <span className="plan-meals-empty">Inget planerat</span>
                    </div>
                  )}

                  <Button
                    className="plan-meals-refresh"
                    variant="outline"
                    size="icon-sm"
                    aria-label={`Byt måltid för ${name}`}
                    disabled={!hasSelectedSource || isBusy}
                    onClick={() => handleRandomizeDay(dayOfWeek)}
                  >
                    <RefreshIcon aria-hidden="true" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="plan-meals-feedback">
            {actionError && (
              <p className="plan-meals-message plan-meals-error" role="alert">
                {actionError}
              </p>
            )}

            {!actionError && saveMessage && (
              <p className="plan-meals-message" role="status">
                {saveMessage}
              </p>
            )}
          </div>

          <div className="plan-meals-actions">
            <Button
              className="plan-meals-randomize"
              type="button"
              disabled={!hasSelectedSource || isBusy}
              onClick={handleRandomizeAll}
            >
              {isRandomizingAll ? "Slumpar..." : "Slumpa alla"}
            </Button>

            <Button
              className="plan-meals-save"
              type="button"
              size="icon"
              aria-label={isSaving ? "Sparar planering" : "Spara planering"}
              title={isSaving ? "Sparar planering" : "Spara planering"}
              disabled={!hasPlannedRecipe || isBusy}
              onClick={handleSave}
            >
              <SaveIcon2 aria-hidden="true" />
            </Button>
          </div>
        </>
      )}
    </DashboardCard>
  );
}

export default PlanMeals;
