import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/tools/ProtectedRoute";

import LoginPage from "./pages/login-page/LoginPage";
import HomePage from "./pages/home-page/HomePage";
import RegisterPage from "./pages/register-page/RegisterPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import RecipePage from "./pages/recipe-page/RecipePage";
import RecipesPage from "./pages/recipes-page/RecipesPage";
import UserRecipesPage from "./pages/user-recipes-page/UserRecipesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/pages/my-recipes/:userId?" element={
          <ProtectedRoute><UserRecipesPage kind="my" /></ProtectedRoute>
        } />
        <Route path="/pages/saved-recipes/:userId?" element={
          <ProtectedRoute><UserRecipesPage kind="saved" /></ProtectedRoute>
        } />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
