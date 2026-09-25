import "./ShoppingList.css";

import { useEffect, useState } from "react";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Button } from "../ui/button.jsx";
import { ShareIcon } from "../../assets/icons/icons.jsx";
import { getShoppingList } from "../../lib/meal-plan/getShoppingList.js";

const amountFormatter = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 2,
});

function ShoppingList({ refreshKey = 0 }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadShoppingList() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getShoppingList();

        if (active) {
          setItems(result);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Kunde inte hämta inköpslistan.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadShoppingList();

    return () => {
      active = false;
    };
  }, [refreshKey]);

  return (
    <DashboardCard>
      <div className="shopping-list-header">
        <div>
          <h2>Veckans inköpslista</h2>
          <p>Ingredienser från veckans matplan.</p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Dela inköpslista"
          title="Dela inköpslista"
        >
          <ShareIcon aria-hidden="true" />
        </Button>
      </div>

      {isLoading && (
        <p className="shopping-list-message">Hämtar inköpslistan...</p>
      )}

      {error && (
        <p className="shopping-list-message shopping-list-error" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && items.length === 0 && (
        <p className="shopping-list-message">
          Spara en matplan för att skapa en inköpslista.
        </p>
      )}

      {!isLoading && !error && items.length > 0 && (
        <ul className="shopping-list-grid">
          {items.map((item) => (
            <li
              className="shopping-list-item"
              key={`${item.name}-${item.unit}`}
            >
              <span className="shopping-list-item-name">{item.name}</span>
              <span className="shopping-list-item-amount">
                {amountFormatter.format(item.amount)} {item.unit}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  );
}

export default ShoppingList;
