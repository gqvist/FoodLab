import "./FoodCalendar.css";

import { Link } from "react-router-dom";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";

function FoodCalendar() {
  return (
    <DashboardCard>
      <div className="food-calendar-header">
        <div>
          <h2>Veckans matplan</h2>
          <p>Planerade recept för den här veckan.</p>
        </div>

        <Button
          nativeButton={false}
          variant="outline"
          render={<Link to="/plan">Ändra planering</Link>}
        />
      </div>

      <div className="food-calendar-grid">
        <p>Här var det tomt..</p>
      </div>
    </DashboardCard>
  );
}

export default FoodCalendar;
