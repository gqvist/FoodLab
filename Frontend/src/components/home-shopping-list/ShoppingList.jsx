import "./ShoppingList.css";

import { useEffect, useState } from "react";

import DashboardCard from "../dashboard-card/DashBoardCard.jsx";
import { Alert, AlertDescription } from "../ui/alert.jsx";
import { Button } from "../ui/button.jsx";
import { Skeleton } from "../ui/skeleton.jsx";
import { ShareIcon } from "../../assets/icons/icons.jsx";
import { getShoppingList } from "../../lib/meal-plan/getShoppingList.js";

// Formats decimal ingredient amounts according to Swedish number conventions.
const amountFormatter = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 2,
});

function ShoppingList({
  refreshKey = 0,
  defaultExpanded = false,
  showHeader = true,
  showToggle = true,
}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    let active = true;

    // Fetches ingredients from the meal-plan API.
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

  const visibleItems = isExpanded ? items : items.slice(0, 12);

  return (
    <DashboardCard>
      {showHeader && (
        <div className="shopping-list-header">
          <div>
            <h2>Veckans inköpslista</h2>
            <p>Ingredienser från veckans matplan.</p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Dela inköpslista (inte tillgängligt ännu)"
            title="Delning är inte tillgängligt ännu"
            disabled
          >
            <ShareIcon aria-hidden="true" />
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="shopping-list-grid" aria-label="Hämtar inköpslistan">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton className="h-11" key={index} />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && items.length === 0 && (
        <p className="shopping-list-message">
          Spara en matplan för att skapa en inköpslista.
        </p>
      )}

      {!isLoading && !error && items.length > 0 && (
        <ul className="shopping-list-grid">
          {visibleItems.map((item) => (
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

      {!isLoading && !error && showToggle && items.length > 12 && (
        <div className="shopping-list-toggle">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? "Visa färre" : "Visa alla"}
          </Button>
        </div>
      )}
    </DashboardCard>
  );
}

export default ShoppingList;
