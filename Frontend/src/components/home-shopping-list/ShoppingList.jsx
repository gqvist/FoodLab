import "./ShoppingList.css"

import DashboardCard from "../dashboard-card/DashBoardCard.jsx"
import { Button } from "../ui/button.jsx"
import { shoppingList } from "../../assets/test-data/homeTestData.js"

function ShoppingList() {
  return (
    <DashboardCard>
      <div className="shopping-list-header">
        <div>
          <h2>Veckans inköpslista</h2>
          <p>Ingredienser från veckans matplan.</p>
        </div>

        <Button variant="outline">
          Dela ↗
        </Button>
      </div>

      <div className="shopping-list-grid">
        {shoppingList.map((item) => (
          <div className="shopping-list-item" key={item.id}>
            <span>{item.name}</span>

            <span className="shopping-list-amount">
              {item.amount} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}

export default ShoppingList