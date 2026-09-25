import "./FoodCalendar.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { getMealPlan } from "../../lib/meal-plan/getMealPlan.js";

const days = [
  { dayOfWeek: 1, name: "Måndag" },
  { dayOfWeek: 2, name: "Tisdag" },
  { dayOfWeek: 3, name: "Onsdag" },
  { dayOfWeek: 4, name: "Torsdag" },
  { dayOfWeek: 5, name: "Fredag" },
  { dayOfWeek: 6, name: "Lördag" },
  { dayOfWeek: 7, name: "Söndag" },
];

function FoodCalendar() {
  const [mealPlan, setMealPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMealPlan() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getMealPlan();

        if (active) {
          setMealPlan(result.days);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Kunde inte hämta matplanen.",
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

  return (
    <DashboardCard>
      <div className="food-calendar-header">
        <div>
          <h2>Veckans matplan</h2>
          <p>Planerade recept för den här veckan.</p>
        </div>

        <div className="food-calendar-actions">
          <Button
            nativeButton={false}
            render={<Link to="/plan">✎ Ändra planering</Link>}
          />

          <Button
            nativeButton={false}
            variant="outline"
            render={<Link to="/profile">Inköpslista</Link>}
          />
        </div>
      </div>

      {isLoading && (
        <p className="food-calendar-message">Hämtar matplanen...</p>
      )}

      {error && (
        <p className="food-calendar-message food-calendar-error" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="food-calendar-grid">
          {days.map(({ dayOfWeek, name }) => {
            const planDay = mealPlan.find((day) => day.dayOfWeek === dayOfWeek);

            const recipe = planDay?.recipe;

            return recipe ? (
              <Link
                key={dayOfWeek}
                to={`/recipe/${recipe.id}`}
                className="food-calendar-day food-calendar-day-link"
                aria-label={`${name}: ${recipe.name}`}
              >
                <span className="food-calendar-day-name">{name}</span>
                <span className="food-calendar-recipe">{recipe.name}</span>
                <span className="food-calendar-time">
                  {recipe.cookingTimeMinutes} min
                </span>
              </Link>
            ) : (
              <div className="food-calendar-day" key={dayOfWeek}>
                <span className="food-calendar-day-name">{name}</span>
                <span className="food-calendar-empty">Inget planerat</span>
              </div>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
}

export default FoodCalendar;
