import { Navigate, useParams } from "react-router-dom";
import TopNav from "../../components/top-nav/TopNav";
import MyRecipes from "../../components/home-my-recipes/MyRecipes";
import SavedRecipes from "../../components/home-saved-recipes/SavedRecipes";
import BackLink from "../../components/back-link/BackLink";
import DashboardCard from "../../components/dashboard-card/DashBoardCard";
import { useRecipes } from "../../lib/recipes/recipeContext";
import "./UserRecipesPage.css";

export default function UserRecipesPage({ kind }) {
  const { userId } = useParams();
  const { currentUserId } = useRecipes();

  if (!userId) {
    return <Navigate to={`/pages/${kind}-recipes/${encodeURIComponent(currentUserId)}`} replace />;
  }

  return (
    <>
      <TopNav />
      <main className="user-recipes-page">
        <div className="user-recipes-container">
          {userId !== currentUserId ? (
            <DashboardCard>
              <h1>Den här receptlistan tillhör en annan användare.</h1>
            </DashboardCard>
          ) : kind === "my" ? (
            <MyRecipes showAll />
          ) : (
            <SavedRecipes showAll />
          )}
          <BackLink />
        </div>
      </main>
    </>
  );
}
