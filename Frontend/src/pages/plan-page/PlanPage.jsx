import "./PlanPage.css";

import TopNav from "../../components/top-nav/TopNav.jsx";
import ShoppingList from "../../components/home-shopping-list/ShoppingList.jsx";
import PlanMeals from "../../components/plan-meals/PlanMeals.jsx";

function PlanPage() {
  return (
    <>
      <TopNav />

      <main className="plan-page">
        <div className="plan-container">
          <PlanMeals />
          <ShoppingList />
        </div>
      </main>
    </>
  );
}

export default PlanPage;
