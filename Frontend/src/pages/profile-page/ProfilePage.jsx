import "./ProfilePage.css";
import TopNav from "../../components/top-nav/TopNav";
import MyRecipes from "../../components/home-my-recipes/MyRecipes";
import SavedRecipes from "../../components/home-saved-recipes/SavedRecipes";
import ShoppingList from "../../components/home-shopping-list/ShoppingList";
import { Button } from "../../components/ui/button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../lib/auth/logout.js";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setError("");
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setError(
        error instanceof TypeError
          ? "Kunde inte ansluta till servern. Försök igen."
          : error.message,
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <TopNav />

      <main className="profile-page">
        <div className="profile-container">
          <ShoppingList />
          <MyRecipes />
          <SavedRecipes />

          {error && <p role="alert">{error}</p>}

          <Button
            className="profile-logout"
            variant="outline"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Loggar ut..." : "Logga ut"}
          </Button>
        </div>
      </main>
    </>
  );
}
