import "./ShoppingListPage.css";

import BackLink from "../../components/back-link/BackLink.jsx";
import ShoppingList from "../../components/home-shopping-list/ShoppingList.jsx";
import TopNav from "../../components/top-nav/TopNav.jsx";

export default function ShoppingListPage() {
  return (
    <>
      <TopNav />

      <main className="shopping-list-page">
        <div className="shopping-list-page-container">
          <ShoppingList />
          <BackLink />
        </div>
      </main>
    </>
  );
}
