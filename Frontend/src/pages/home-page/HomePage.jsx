import "./HomePage.css";

import TopNav from "../../components/top-nav/TopNav";
import FoodCalendar from "../../components/home-food-calendar/FoodCalendar";
import ShoppingList from "../../components/home-shopping-list/ShoppingList";
import MyRecipes from "../../components/home-my-recipes/MyRecipes";
import SavedRecipes from "../../components/home-saved-recipes/SavedRecipes";

function HomePage() {
  return (
    <>
      <TopNav />

      <main className="home-page">
        <div className="home-container">
          <FoodCalendar />
          <ShoppingList />
          <MyRecipes />
          <SavedRecipes />
        </div>
      </main>
    </>
  );
}

export default HomePage;