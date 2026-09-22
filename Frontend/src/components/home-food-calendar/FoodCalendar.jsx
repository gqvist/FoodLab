import "./FoodCalendar.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { weekPlan, recipes } from "../../assets/test-data/homeTestData.js";

function FoodCalendar() {
  const [showAll, setShowAll] = useState(false);

  const today = dayjs();

  // Så att veckodagen skrivs ut
  const currentDay = today.toDate().toLocaleDateString("sv-SE", {
    weekday: "long",
  });

  return (
    <DashboardCard>
      <div className="food-calendar-header">
        <div>
          <h2>Veckans matplan</h2>
          <p>Planerade recept för den här veckan.</p>
        </div>

        <Button
          variant="outline"
          render={<Link to="/plan">Ändra planering</Link>}
        />
      </div>

      <div
        className={`food-calendar-grid ${
          showAll ? "food-calendar-grid-expanded" : ""
        }`}
      >
        {weekPlan.map((item) => {
          const isToday = item.day.toLowerCase() === currentDay.toLowerCase();
          const recipe = recipes.find((recipe) => recipe.id === item.recipeId);
          if (!recipe) return null;

          return (
            <Link
              to={`/recipe/${recipe.id}`}
              className={`food-calendar-day ${
                isToday ? "food-calendar-day-today" : ""
              }`}
              key={item.day}
            >
              <span className="food-calendar-day-name">{item.day}</span>

              <span className="food-calendar-recipe">{recipe.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="food-calendar-expand">
        <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Visa mindre" : "Visa alla"}
        </Button>
      </div>
    </DashboardCard>
  );
}

export default FoodCalendar;
