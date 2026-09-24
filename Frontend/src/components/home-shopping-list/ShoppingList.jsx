import "./ShoppingList.css";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";

function ShoppingList() {
  return (
    <DashboardCard>
      <div className="shopping-list-header">
        <div>
          <h2>Veckans inköpslista</h2>
          <p>Ingredienser från veckans matplan.</p>
        </div>
      </div>

      <div className="shopping-list-grid">
        <p>En plan måste skapas för att inköpslistan ska skapas...</p>
      </div>
    </DashboardCard>
  );
}

export default ShoppingList;
