import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/tools/ProtectedRoute";

import LoginPage from "./pages/login-page/LoginPage";
import HomePage from "./pages/home-page/HomePage";
import RegisterPage from "./pages/register-page/RegisterPage";
import RecipePage from "./pages/recipe-page/RecipePage";
import RecipesPage from "./pages/recipes-page/RecipesPage";
import UserRecipesPage from "./pages/user-recipes-page/UserRecipesPage";
import NewRecipePage from "./pages/new-recipe-page/NewRecipePage";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import PlanPage from "./pages/plan-page/PlanPage";
import ShoppingListPage from "./pages/shopping-list-page/ShoppingListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Navigate to="/home" replace />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/recipe/new" element={<NewRecipePage />} />
          <Route path="/recipe/:id/edit" element={<NewRecipePage editMode />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          <Route
            path="/shoppinglist"
            element={<Navigate to="/shopping-list" replace />}
          />
          <Route path="/my-recipes" element={<UserRecipesPage kind="my" />} />
          <Route path="/saved-recipes" element={<UserRecipesPage kind="saved" />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
