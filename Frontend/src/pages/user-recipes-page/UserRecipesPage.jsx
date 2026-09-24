import TopNav from "../../components/top-nav/TopNav";
import MyRecipes from "../../components/home-my-recipes/MyRecipes";
import SavedRecipes from "../../components/home-saved-recipes/SavedRecipes";
import BackLink from "../../components/back-link/BackLink";
import "./UserRecipesPage.css";

export default function UserRecipesPage({ kind }) {
  return (
    <>
      <TopNav />
      <main className="user-recipes-page">
        <div className="user-recipes-container">
          {kind === "my" ? <MyRecipes showAll /> : <SavedRecipes showAll />}
          <BackLink />
        </div>
      </main>
    </>
  );
}
