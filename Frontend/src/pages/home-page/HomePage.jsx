import "./HomePage.css";

import TopNav from "../../components/top-nav/TopNav";
import FoodCalendar from "../../components/home-food-calendar/FoodCalendar";
import MyRecipes from "../../components/home-my-recipes/MyRecipes";
import SavedRecipes from "../../components/home-saved-recipes/SavedRecipes";

function HomePage() {
  return (
    <>
      <TopNav />

      <main className="home-page">
        <div className="home-container">
          <FoodCalendar />
          <MyRecipes />
          <SavedRecipes />
        </div>
      </main>
    </>
  );
}

export default HomePage;
