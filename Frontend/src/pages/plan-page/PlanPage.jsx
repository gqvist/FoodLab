import "./PlanPage.css";

import { useState } from "react";

import TopNav from "../../components/top-nav/TopNav.jsx";
import ShoppingList from "../../components/home-shopping-list/ShoppingList.jsx";
import PlanMeals from "../../components/plan-meals/PlanMeals.jsx";

function PlanPage() {
  const [shoppingListVersion, setShoppingListVersion] = useState(0);

  function refreshShoppingList() {
    setShoppingListVersion((currentVersion) => currentVersion + 1);
  }

  return (
    <>
      <TopNav />

      <main className="plan-page">
        <div className="plan-container">
          <PlanMeals onSaved={refreshShoppingList} />
          <ShoppingList refreshKey={shoppingListVersion} />
        </div>
      </main>
    </>
  );
}

export default PlanPage;
